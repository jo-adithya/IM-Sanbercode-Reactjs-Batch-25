import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { fetchGames, fetchMovies } from '../utils/helper';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import Button from '@material-ui/core/Button';
import { AuthContext } from '../context/AuthContext';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import logo from '../static/images/app_logo.png';

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }
  static contextType = AuthContext;

  componentDidMount() {
    this.type = this.props.movie ? 'movies' : 'games';
    this.id = parseInt(this.props.match.params.id);
    if (this.type === 'movies') {
      fetchMovies((data) => {
        let filtered = data.filter((x) => x.id === this.id)[0];
        this.setState({ data: filtered });
        if (!filtered) {
          this.props.history.replace('/');
          return null;
        }
      });
    } else {
      fetchGames((data) => {
        let filtered = data.filter((x) => x.id === this.id)[0];
        this.setState({ data: filtered });
        if (!filtered) {
          this.props.history.replace('/');
          return null;
        }
      });
    }
  }

  render() {
    return (
      <>
        {!!this.state.data && (
          <section>
            {this.context.isLoggedIn && <div className="filler"></div>}
            <div>
              <div
                style={
                  !this.context.isLoggedIn
                    ? {
                        textAlign: 'left',
                        margin: 'auto 240px auto 220px',
                        position: 'absolute',
                        color: 'white',
                        top: '22%',
                        zIndex: 1,
                        display: 'flex',
                        gap: '30px',
                      }
                    : {
                        textAlign: 'left',
                        margin: 'auto 140px auto 120px',
                        position: 'absolute',
                        color: 'white',
                        top: '22%',
                        zIndex: 1,
                        display: 'flex',
                        gap: '30px',
                      }
                }
              >
                <IconButton
                  color="secondary"
                  onClick={() => {
                    this.props.history.replace('/home');
                  }}
                >
                  <ArrowBackIosIcon />
                </IconButton>
                <img
                  src={this.state.data.image_url}
                  alt="Poster"
                  style={{
                    width: '300px',
                    height: '432px',
                    objectFit: 'cover',
                    marginRight: '30px',
                  }}
                />
                <div style={{ maxHeight: '432px', overflow: 'auto' }}>
                  <Typography variant="h2">{this.state.data.title}</Typography>
                  <Typography variant="h6">
                    {this.state.data.year}
                    &nbsp;{' | '}&nbsp;
                    {this.state.data.genre}&nbsp;
                    {this.state.data.duration
                      ? `  |  ${this.state.data.duration}m`
                      : null}
                  </Typography>{' '}
                  <br />
                  <br />
                  {this.type === 'movies' ? (
                    <>
                      <Typography variant="h6">
                        {this.state.data.description}
                      </Typography>
                      <br />
                      <br />
                      <Typography variant="h4">Review</Typography>
                      <br />
                      <Rating
                        name="read-only"
                        value={this.state.data.rating}
                        readOnly
                      />
                      <Typography variant="h6">
                        {this.state.data.review}
                      </Typography>
                    </>
                  ) : (
                    <>
                      <Typography variant="h4" style={{ marginBottom: '5px' }}>
                        Platform
                      </Typography>
                      <Typography variant="h6">
                        {this.state.data.platform}
                      </Typography>
                      <br />
                      <Typography variant="h4">Mode</Typography>
                      {!!this.state.data.singlePlayer && (
                        <Button
                          variant="contained"
                          style={{
                            borderRadius: '20px',
                            fontSize: '.8em',
                            marginTop: '10px',
                            marginRight: '10px',
                          }}
                        >
                          Single Player
                        </Button>
                      )}
                      {!!this.state.data.multiplayer && (
                        <Button
                          variant="contained"
                          style={{
                            borderRadius: '20px',
                            fontSize: '.8em',
                            marginTop: '10px',
                          }}
                        >
                          Multiplayer
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </div>
              <img
                src={this.state.data.image_url}
                className="carousel-image"
                alt="Poster Background"
                style={{ position: 'absolute' }}
              />
            </div>
            <div
              style={
                this.context.isLoggedIn
                  ? {
                      width: 'calc(100% - 240px)',
                      color: 'white',
                      position: 'absolute',
                      bottom: '0',
                      marginBottom: '20px',
                      marginLeft: '240px',
                    }
                  : {
                      width: '100%',
                      color: 'white',
                      position: 'absolute',
                      bottom: '0',
                      marginBottom: '20px',
                    }
              }
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
          </section>
        )}
      </>
    );
  }
}

export default withRouter(Details);
