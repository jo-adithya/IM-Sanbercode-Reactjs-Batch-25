import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import FilterListIcon from '@material-ui/icons/FilterList';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const useToolbarStyles = makeStyles((theme) => ({
  title: {
    flex: '1 1 100%',
  },
  root: {
    '& .MuiInputBase-root.MuiFilledInput-root.MuiFilledInput-underline::before':
      {
        borderColor: '#ec575a',
      },
    '& .MuiInputBase-root.MuiFilledInput-root': {
      backgroundColor: 'rgba(200,200,200,0.1)',
    },
    '& .MuiInputBase-input.MuiFilledInput-input': {
      color: 'white',
    },
    '& .MuiFormLabel-colorSecondary': {
      color: '#aaa',
    },
    '& .MuiInputLabel-shrink.Mui-focused': {
      color: '#f50057',
    },
  },
}));

const EnhancedTableToolbar = (props) => {
  const handleClick = () => {
    props.onFilterClick();
  };

  return (
    <Toolbar
      style={{
        alignSelf: 'flex-end',
        padding: '0',
        minHeight: '50px !important',
      }}
    >
      <Tooltip title="Filter list">
        <IconButton aria-label="filter list" onClick={handleClick}>
          <FilterListIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
};

const Header = (props) => {
  const classes = useToolbarStyles();
  const [filter, setFilter] = useState(false);
  const [movieFilterInputs, setMovieFilterInputs] = useState({
    title: '',
    year: '',
    duration: '',
    rating: '',
  });
  const [gameFilterInputs, setGameFilterInputs] = useState({
    name: '',
    year: '',
    singlePlayer: false,
    multiplayer: false,
  });

  const handleMovieFilterChange = (event) => {
    setMovieFilterInputs((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  };

  const handleGameFilterChange = (event) => {
    setGameFilterInputs((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  };

  const handleSwitch = (event) => {
    setGameFilterInputs((prevState) => {
      return { ...prevState, [event.target.name]: event.target.checked };
    });
  };

  const handleFilterClick = () => {
    if (filter) {
      if (props.movie) {
        let emptyData = {
          title: '',
          year: '',
          duration: '',
          rating: '',
        };
        setMovieFilterInputs(emptyData);
        props.onFilterSubmit(emptyData);
      } else {
        setGameFilterInputs({
          name: '',
          year: '',
          singlePlayer: false,
          multiplayer: false,
        });
        props.onFilterSubmit({
          name: '',
          year: '',
          singlePlayer: null,
          multiplayer: null,
        });
      }
    }
    setFilter((prevState) => !prevState);
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    if (props.movie) {
      props.onFilterSubmit(movieFilterInputs);
    } else {
      props.onFilterSubmit(gameFilterInputs);
    }
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '15px',
        }}
      >
        <Typography variant="h2" style={{ color: 'white', textAlign: 'left' }}>
          {props.movie ? 'Movies' : 'Games'}
        </Typography>
        <EnhancedTableToolbar onFilterClick={handleFilterClick} />
      </div>
      <br />
      <form
        className={filter ? 'show hidden' : 'hidden'}
        onSubmit={handleFilterSubmit}
      >
        {props.movie ? (
          <>
            <TextField
              name="title"
              label="Title"
              color="secondary"
              variant="filled"
              className={classes.root}
              value={movieFilterInputs.title}
              onChange={handleMovieFilterChange}
              style={{ width: '350px' }}
            />
            <TextField
              name="year"
              type="number"
              color="secondary"
              variant="filled"
              label="Release Year"
              className={classes.root}
              value={movieFilterInputs.year}
              onChange={handleMovieFilterChange}
              style={{ width: '150px' }}
            />
            <TextField
              name="duration"
              type="number"
              color="secondary"
              variant="filled"
              label="Min Duration"
              className={classes.root}
              value={movieFilterInputs.duration}
              onChange={handleMovieFilterChange}
              style={{ width: '150px' }}
            />
            <div
              style={{
                height: '56px',
                backgroundColor: 'rgba(200,200,200,.1)',
                borderBottom: '1px solid #ec575a',
                borderTopLeftRadius: '4px',
                borderTopRightRadius: '4px',
              }}
            >
              <Box
                component="fieldset"
                borderColor="transparent"
                style={{ padding: '7px 9px' }}
              >
                <Typography
                  variant="body2"
                  className="MuiFormLabel-colorSecondary MuiInputLabel-shrink"
                  style={{
                    color: '#aaa',
                    textAlign: 'left',
                    lineHeight: '1rem',
                    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                    fontSize: '1rem',
                  }}
                >
                  Min Rating
                </Typography>
                <Rating
                  name="rating"
                  onChange={handleMovieFilterChange}
                  value={movieFilterInputs.rating}
                  max={10}
                />
              </Box>
            </div>
          </>
        ) : (
          <>
            <TextField
              name="name"
              label="Name"
              color="secondary"
              variant="filled"
              className={classes.root}
              value={gameFilterInputs.name}
              onChange={handleGameFilterChange}
              style={{ width: '365px' }}
            />
            <TextField
              name="year"
              type="number"
              label="Release Year"
              color="secondary"
              variant="filled"
              className={classes.root}
              value={gameFilterInputs.year}
              onChange={handleGameFilterChange}
              style={{ width: '150px' }}
            />
            <div
              style={{
                height: '56px',
                backgroundColor: 'rgba(200,200,200,.1)',
                borderBottom: '1px solid #ec575a',
                borderTopLeftRadius: '4px',
                borderTopRightRadius: '4px',
                minWidth: '196px',
              }}
            >
              <FormControlLabel
                control={
                  <Switch
                    checked={gameFilterInputs.singlePlayer}
                    onChange={handleSwitch}
                    name="singlePlayer"
                  />
                }
                label="Single Player"
                style={{
                  margin: '9px 30px 9px 15px',
                  color: 'white',
                  minWidth: '152px',
                }}
              />
            </div>
            <div
              style={{
                height: '56px',
                backgroundColor: 'rgba(200,200,200,.1)',
                borderBottom: '1px solid #ec575a',
                borderTopLeftRadius: '4px',
                borderTopRightRadius: '4px',
              }}
            >
              <FormControlLabel
                control={
                  <Switch
                    checked={gameFilterInputs.multiplayer}
                    onChange={handleSwitch}
                    name="multiplayer"
                  />
                }
                label="Multiplayer"
                style={{ margin: '9px 30px 9px 15px', color: 'white' }}
              />
            </div>
          </>
        )}
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          style={{ height: '56px', width: '145px' }}
        >
          Filter
        </Button>
      </form>
      <br />
    </>
  );
};

export default Header;
