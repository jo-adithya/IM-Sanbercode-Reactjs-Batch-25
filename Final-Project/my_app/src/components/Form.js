import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  fetchGames,
  fetchMovies,
  postMovie,
  postGame,
  editGame,
  editMovie,
} from '../utils/helper';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import Button from '@material-ui/core/Button';
import { AuthContext } from '../context/AuthContext';
import { withStyles } from '@material-ui/styles';
import Backdrop from '@material-ui/core/Backdrop';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import logo from '../static/images/app_logo.png';

const styles = (theme) => ({
  root: {
    width: 500,
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: 'white',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#f50057',
    },
    '& .MuiInputLabel-root': {
      color: '#ddd',
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: '#f50057',
    },
    '& .MuiFormLabel-colorSecondary.Mui-focused': {
      color: '#f50057 !important',
    },
  },
  backdrop: {
    zIndex: 3,
    color: '#fff',
  },
});

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      title: '',
      genre: '',
      imageUrl: '',
      year: '',
      description: '',
      duration: '',
      rating: 0,
      review: '',
      singlePlayer: '',
      multiplayer: '',
      platform: '',
    };
    this.id = parseInt(this.props.match.params.id);
  }
  static contextType = AuthContext;

  componentDidMount() {
    if (this.props.edit) {
      this.setState({ isLoading: true });
      if (this.props.movie) {
        fetchMovies((data) => {
          let filtered = data.filter((x) => x.id === this.id)[0];
          if (!filtered) {
            this.props.history.replace('/');
          }
          this.setState({
            isLoading: false,
            title: filtered.title,
            genre: filtered.genre,
            imageUrl: filtered.image_url,
            year: filtered.year,
            description: filtered.description,
            duration: filtered.duration,
            rating: filtered.rating,
            review: filtered.review,
          });
        });
      } else {
        fetchGames((data) => {
          let filtered = data.filter((x) => x.id === this.id)[0];
          if (!filtered) {
            this.props.history.replace('/');
          }
          this.setState({
            isLoading: false,
            title: filtered.title,
            genre: filtered.genre,
            imageUrl: filtered.image_url,
            year: filtered.year,
            singlePlayer: filtered.singlePlayer,
            multiplayer: filtered.multiplayer,
            platform: filtered.platform,
          });
        });
      }
    }
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.props.movie) {
      let data = {
        title: this.state.title,
        description: this.state.description,
        year: this.state.year,
        duration: this.state.duration,
        genre: this.state.genre,
        rating: this.state.rating,
        review: this.state.review,
        image_url: this.state.imageUrl,
      };
      if (this.props.edit) {
        editMovie(this.id, data, this.context.token, () => {
          this.props.history.replace('/movie-list-editor');
        });
      } else {
        postMovie(data, this.context.token, () => {
          this.props.history.replace('/movie-list-editor');
        });
      }
    } else {
      let data = {
        name: this.state.title,
        genre: this.state.genre,
        singlePlayer: this.state.singlePlayer,
        multiplayer: this.state.multiplayer,
        platform: this.state.platform,
        release: this.state.year,
        image_url: this.state.imageUrl,
      };
      if (this.props.edit) {
        editGame(this.id, data, this.context.token, () => {
          this.props.history.replace('/game-list-editor');
        });
      } else {
        postGame(data, this.context.token, () => {
          this.props.history.replace('/game-list-editor');
        });
      }
    }
  };

  render() {
    return (
      <div>
        <section>
          <div className="filler"></div>
          <div style={{ margin: '55px auto' }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                top: '10%',
              }}
            >
              <Backdrop
                className={this.props.classes.backdrop}
                open={this.state.isLoading}
              >
                <CircularProgress color="secondary" />
              </Backdrop>
              <Typography
                variant="h3"
                style={{
                  color: 'white',
                  marginBottom: '20px',
                  width: '100%',
                  zIndex: 1,
                }}
              >
                {this.props.edit
                  ? this.props.movie
                    ? 'Edit Movie'
                    : 'Edit Game'
                  : this.props.movie
                  ? 'Add a Movie'
                  : 'Add a Game'}
              </Typography>
              <div
                style={{
                  textAlign: 'left',
                  color: 'white',
                  display: 'flex',
                  gap: '40px',
                  justifyContent: ' center',
                  zIndex: 1,
                }}
              >
                <img
                  src={
                    this.props.edit
                      ? this.state.imageUrl
                      : 'https://i.pinimg.com/originals/d7/81/70/d781702860c7a3ef484c99bc8f55d726.jpg'
                  }
                  alt="Poster"
                  style={{
                    width: '350px',
                    height: '504px',
                    objectFit: 'cover',
                  }}
                />
                <div style={{ maxHeight: '520px', overflow: 'auto' }}>
                  <form
                    onSubmit={this.handleSubmit}
                    style={{ display: 'flex', flexDirection: 'column' }}
                  >
                    <TextField
                      variant="outlined"
                      margin="dense"
                      required
                      id="title"
                      label="Title"
                      name="title"
                      autoFocus
                      className={this.props.classes.root}
                      value={this.state.title}
                      onChange={this.handleChange}
                    />
                    <TextField
                      variant="outlined"
                      margin="dense"
                      required
                      id="genre"
                      label="Genre"
                      name="genre"
                      className={this.props.classes.root}
                      value={this.state.genre}
                      onChange={this.handleChange}
                    />
                    <TextField
                      variant="outlined"
                      margin="dense"
                      required
                      type="number"
                      id="year"
                      label="Release Year"
                      name="year"
                      className={this.props.classes.root}
                      value={this.state.year}
                      onChange={this.handleChange}
                    />
                    {this.props.movie ? (
                      <>
                        <TextField
                          variant="outlined"
                          margin="dense"
                          required
                          multiline
                          rows={1}
                          rowsMax={3}
                          id="description"
                          label="Description"
                          name="description"
                          className={this.props.classes.root}
                          value={this.state.description}
                          onChange={this.handleChange}
                        />
                        <TextField
                          variant="outlined"
                          margin="dense"
                          required
                          type="number"
                          id="duration"
                          label="Duration (min)"
                          name="duration"
                          className={this.props.classes.root}
                          value={this.state.duration}
                          onChange={this.handleChange}
                        />
                        <TextField
                          variant="outlined"
                          margin="dense"
                          required
                          id="review"
                          label="Review"
                          name="review"
                          className={this.props.classes.root}
                          value={this.state.review}
                          onChange={this.handleChange}
                        />
                      </>
                    ) : (
                      <>
                        <TextField
                          variant="outlined"
                          margin="dense"
                          required
                          id="platform"
                          label="Platform"
                          name="platform"
                          className={this.props.classes.root}
                          value={this.state.platform}
                          onChange={this.handleChange}
                        />
                        <TextField
                          variant="outlined"
                          margin="dense"
                          required
                          type="number"
                          id="singlePlayer"
                          label="Single Player"
                          name="singlePlayer"
                          className={this.props.classes.root}
                          value={this.state.singlePlayer}
                          inputProps={{ min: 0, max: 1, step: 1 }}
                          onChange={this.handleChange}
                        />
                        <TextField
                          variant="outlined"
                          margin="dense"
                          required
                          type="number"
                          id="multiplayer"
                          label="Multiplayer"
                          name="multiplayer"
                          className={this.props.classes.root}
                          value={this.state.multiplayer}
                          inputProps={{ min: 0, max: 1, step: 1 }}
                          onChange={this.handleChange}
                        />
                      </>
                    )}
                    <TextField
                      variant="outlined"
                      margin="dense"
                      required
                      id="imageUrl"
                      label="Image URL"
                      name="imageUrl"
                      className={this.props.classes.root}
                      value={this.state.imageUrl}
                      onChange={this.handleChange}
                    />
                    {this.props.movie && (
                      <Box
                        component="fieldset"
                        borderColor="transparent"
                        style={{ marginTop: '8px', padding: '5px 9px' }}
                      >
                        <Typography component="legend">Rating</Typography>
                        <Rating
                          classes={{
                            iconHover: { color: '#f7b432' },
                          }}
                          name="rating"
                          onChange={this.handleChange}
                          value={this.state.rating}
                          max={10}
                        />
                      </Box>
                    )}
                    <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      className="button-submit"
                      style={{
                        padding: '40px auto',
                        marginTop: '10px',
                      }}
                    >
                      Submit
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <img
            src={
              this.props.edit
                ? this.state.imageUrl
                : 'https://i.pinimg.com/originals/d7/81/70/d781702860c7a3ef484c99bc8f55d726.jpg'
            }
            alt="Poster Background"
            className="carousel-image"
            style={{ position: 'absolute', zIndex: 0, height: '820px' }}
          />
        </section>
        <div
          style={{
            width: 'calc(100% - 240px)',
            color: 'white',
            bottom: '-90px',
            marginTop: '47px',
            position: 'absolute',
            marginLeft: '240px',
            zIndex: 1,
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
    );
  }
}

export default withStyles(styles)(withRouter(Form));
