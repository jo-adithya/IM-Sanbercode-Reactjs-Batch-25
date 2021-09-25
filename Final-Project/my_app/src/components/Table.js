import React, { useEffect, useState, useContext } from 'react';
import Header from './Header';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import {
  fetchGames,
  fetchMovies,
  deleteMovie,
  deleteGame,
} from '../utils/helper';
import { useHistory, withRouter } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import logo from '../static/images/app_logo.png';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const EnhancedTableHead = (props) => {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  let headCells = [];
  if (props.movie) {
    headCells = [
      { id: 'no', label: 'No' },
      { id: 'title', label: 'Title' },
      { id: 'image', label: 'Image' },
      { id: 'genre', label: 'Genre' },
      { id: 'year', label: 'Year' },
      { id: 'description', label: 'Description' },
      { id: 'duration', label: 'Duration' },
      { id: 'rating', label: 'Rating' },
      { id: 'review', label: 'Review' },
    ];
  } else {
    headCells = [
      { id: 'no', label: 'No' },
      { id: 'title', label: 'Name' },
      { id: 'image', label: 'Image' },
      { id: 'genre', label: 'Genre' },
      { id: 'year', label: 'Release' },
      { id: 'singlePlayer', label: 'Single Player' },
      { id: 'multiplayer', label: 'Multiplayer' },
      { id: 'platform', label: 'Platform' },
    ];
  }

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={'left'}
            padding={'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell>Action</TableCell>
      </TableRow>
    </TableHead>
  );
};

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
    backgroundColor: 'rgba(200,200,200,0.1)',
    borderRadius: '10px',
    color: 'white',
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
    transition: '.5s ease-in-out',
  },
  show: {
    height: '50px',
    display: 'flex',
    gap: '20px',
    margin: '15px 0',
    clear: 'both',
  },
}));

const EnhancedTable = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const authContext = useContext(AuthContext);
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('year');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (props.movie) {
      fetchMovies((data) => {
        setRows(data);
      });
    } else {
      fetchGames((data) => {
        setRows(data);
      });
    }
  }, [props.movie]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = (e) => {
    let id = parseInt(e.currentTarget.id);
    if (props.movie) {
      deleteMovie(id, authContext.token, () => {
        fetchMovies((data) => {
          setRows(data);
        });
      });
    } else {
      deleteGame(id, authContext.token, () => {
        fetchGames((data) => {
          setRows(data);
        });
      });
    }
  };

  const handleFilterSubmit = (filter) => {
    if (props.movie) {
      fetchMovies((data) => {
        setRows(
          data.filter((x) => {
            return (
              x.title.substring(0, filter.title.length).toLowerCase() ===
                filter.title.toLowerCase() &&
              (filter.year ? x.year === parseInt(filter.year) : true) &&
              x.duration >= filter.duration &&
              x.rating >= filter.rating
            );
          })
        );
      });
    } else {
      fetchGames((data) => {
        setRows(
          data.filter((x) => {
            return (
              x.title.substring(0, filter.name.length).toLowerCase() ===
                filter.name.toLowerCase() &&
              (filter.year ? x.year === parseInt(filter.year) : true) &&
              (filter.singlePlayer === null
                ? true
                : filter.singlePlayer === !!x.singlePlayer) &&
              (filter.multiplayer === null
                ? true
                : filter.multiplayer === !!x.multiplayer)
            );
          })
        );
      });
    }
  };

  return (
    <section>
      <div className="filler"></div>
      <div className="main" style={{ padding: '0 40px' }}>
        <Header movie={props.movie} onFilterSubmit={handleFilterSubmit} />
        <div>
          <div className={classes.root}>
            <Paper className={classes.paper}>
              <TableContainer className={classes.table}>
                <Table
                  className={classes.table}
                  aria-labelledby="tableTitle"
                  size={'medium'}
                  aria-label="enhanced table"
                >
                  <EnhancedTableHead
                    classes={classes}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    rowCount={rows.length}
                    movie={props.movie}
                  />
                  <TableBody>
                    {stableSort(rows, getComparator(order, orderBy))
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, index) => {
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={index}
                          >
                            <TableCell component="th" id={labelId} scope="row">
                              {index + 1}
                            </TableCell>
                            <TableCell>
                              <div
                                style={{
                                  maxHeight: '136px',
                                  maxWidth: '116px',
                                  overflow: 'auto',
                                  textOverflow: 'ellipsis',
                                }}
                              >
                                {row.title}
                              </div>
                            </TableCell>
                            <TableCell>
                              <img
                                src={row.image_url}
                                alt={row.title}
                                style={{
                                  width: '100px',
                                  height: '144px',
                                  objectFit: 'cover',
                                  borderRadius: '10px',
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              <div
                                style={{
                                  maxHeight: '136px',
                                  width: '85px',
                                  overflow: 'auto',
                                  textOverflow: 'ellipsis',
                                }}
                              >
                                {row.genre.split(',').map((val, i) => (
                                  <div key={i}>{val}</div>
                                ))}
                              </div>
                            </TableCell>
                            <TableCell>{row.year}</TableCell>
                            {props.movie ? (
                              <>
                                <TableCell>
                                  <div
                                    style={{
                                      maxHeight: '136px',
                                      maxWidth: '116px',
                                      overflow: 'auto',
                                      textOverflow: 'ellipsis',
                                      letterSpacing: '.3px',
                                    }}
                                  >
                                    {row.description}
                                  </div>
                                </TableCell>
                                <TableCell>{row.duration}</TableCell>
                                <TableCell>{row.rating}</TableCell>
                                <TableCell>
                                  <div
                                    style={{
                                      maxHeight: '136px',
                                      maxWidth: '116px',
                                      overflow: 'auto',
                                      textOverflow: 'ellipsis',
                                    }}
                                  >
                                    {row.review}
                                  </div>
                                </TableCell>
                              </>
                            ) : (
                              <>
                                <TableCell>{row.singlePlayer}</TableCell>
                                <TableCell>{row.multiplayer}</TableCell>
                                <TableCell>{row.platform}</TableCell>
                              </>
                            )}
                            <TableCell>
                              <Button
                                onClick={() => {
                                  props.movie
                                    ? history.push(
                                        `/movie-list-editor/edit/${row.id}`
                                      )
                                    : history.push(
                                        `/game-list-editor/edit/${row.id}`
                                      );
                                }}
                              >
                                <EditIcon style={{ color: 'white' }} />
                              </Button>
                              <Button onClick={handleDelete} id={row.id}>
                                <DeleteIcon style={{ color: 'white' }} />
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                className={classes.table}
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </Paper>
          </div>
        </div>
        <div
          style={{
            width: 'calc(100%)',
            marginLeft: '250px',
            color: 'white',
            margin: '60px auto -37px auto',
          }}
        >
          <img
            src={logo}
            alt="logo"
            height="30px"
            style={{ marginBottom: '5px' }}
          />
          <Typography variant="body1">
            &copy; 2021 Created by Jonathan Adithya
          </Typography>
        </div>
      </div>
    </section>
  );
};

export default withRouter(EnhancedTable);
