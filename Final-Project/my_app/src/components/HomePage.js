import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Card from './Card';
import Button from '@material-ui/core/Button';
import { fetchGames, fetchMovies } from '../utils/helper';
import { AuthContext } from '../context/AuthContext';
import logo from '../static/images/app_logo.png';

const Home = (props) => {
  const movies = props.data.movies
    .sort((a, b) => (a.year > b.year ? -1 : b.year > a.year ? 1 : 0))
    .slice(0, 5);
  const games = props.data.games
    .sort((a, b) =>
      a.year > b.year ? -1 : b.year > a.year ? 1 : 0
    )
    .slice(0, 5);
  const styles = {
    textAlign: 'left',
    color: 'white',
    margin: '50px 0 30px 0',
  };

  return (
    <div style={{ width: '1100px', margin: 'auto' }}>
      <Typography variant="h3" component="h1" style={styles}>
        Latest Movies
      </Typography>
      <div className="image-container" style={{ display: 'flex', gap: '25px' }}>
        {movies.map((x, i) => (
          <Card key={i} data={x} movie={true} />
        ))}
      </div>
      <Typography variant="h3" component="h1" style={styles}>
        Latest Games
      </Typography>
      <div className="image-container" style={{ display: 'flex', gap: '25px' }}>
        {games.map((x, i) => (
          <Card key={i} data={x} />
        ))}
      </div>
    </div>
  );
};

const List = (props) => {
  let temp = [...props.data];
  let data = [];
  for (let i = 0, n = Math.ceil(temp.length / 5); i < n; i++) {
    if (temp.length > 5) {
      data.push(temp.slice(0, 5));
      temp.splice(0, 5);
    } else {
      data.push(temp.slice(0, temp.length));
      temp.splice(0, 5);
    }
  }

  return (
    <div style={{ width: '1100px', margin: 'auto' }}>
      <Typography
        variant="h3"
        component="h1"
        style={{
          fontWeight: '900',
          textAlign: 'left',
          color: 'white',
          margin: '50px 0 30px 0',
        }}
      >
        {props.title}
      </Typography>
      {data.map((group, index) => (
        <div
          key={index}
          style={{ display: 'flex', gap: '25px', marginBottom: '25px' }}
        >
          {group.map((x, i) => (
            <Card key={i} data={x} movies={props.title === 'Movies'} />
          ))}
        </div>
      ))}
    </div>
  );
};

class HomePage extends Component {
  static contextType = AuthContext;

  state = {
    page: 'home',
    movies: [],
    games: [],
  };

  componentDidMount() {
    fetchMovies((data) => {
      this.setState({ movies: data });
    });
    fetchGames((data) => {
      this.setState({ games: data });
    });
  }

  render() {
    const buttonStyles = {
      borderBottom: '1px solid #fff',
      borderRadius: '0',
      color: 'white',
    };
    return (
      <section>
        {this.context.isLoggedIn && <div className="filler"></div>}
        <div className={this.context.isLoggedIn ? 'logged main' : 'main'}>
          <div
            style={{
              display: 'flex',
              gap: '40px',
              justifyContent: 'center',
              paddingTop: '20px',
            }}
          >
            <Button
              style={buttonStyles}
              className="homepage-btn"
              onClick={() => {
                this.setState({ page: 'home' });
              }}
            >
              Home
            </Button>
            <Button
              style={buttonStyles}
              className="homepage-btn"
              onClick={() => {
                this.setState({ page: 'games' });
              }}
            >
              Games
            </Button>
            <Button
              style={buttonStyles}
              className="homepage-btn"
              onClick={() => {
                this.setState({ page: 'movies' });
              }}
            >
              Movies
            </Button>
          </div>
          {this.state.page === 'home' ? (
            <Home data={this.state} />
          ) : this.state.page === 'movies' ? (
            <List title="Movies" data={this.state.movies} />
          ) : (
            <List title="Games" data={this.state.games} />
          )}
          <div
            style={
              this.context.isLoggedIn
                ? {
                    width: 'calc(100% - 240px)',
                    marginLeft: '240px',
                    color: 'white',
                    margin: '60px auto 20px auto',
                  }
                : {
                    width: '100%',
                    color: 'white',
                    margin: '60px auto 20px auto',
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
        </div>
      </section>
    );
  }
}

export default HomePage;
