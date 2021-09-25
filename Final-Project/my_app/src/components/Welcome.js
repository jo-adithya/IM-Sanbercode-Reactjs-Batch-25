import React, { useContext } from 'react';
import Carousel from 'react-material-ui-carousel';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import logo from '../static/images/app_logo.png';

import '../static/css/Welcome.css';

const Welcome = () => {
  const history = useHistory();
  const authContext = useContext(AuthContext);

  return (
    <section>
      {authContext.isLoggedIn && <div className="filler"></div>}
      <div>
        <div
          style={
            authContext.isLoggedIn
              ? {
                  textAlign: 'left',
                  margin: 'auto 0 auto 120px',
                  position: 'absolute',
                  color: 'white',
                  top: '30%',
                  zIndex: 1,
                }
              : {
                  textAlign: 'left',
                  margin: 'auto 0 auto 178px',
                  position: 'absolute',
                  color: 'white',
                  top: '30%',
                  zIndex: 1,
                }
          }
        >
          <Typography variant="h1">Welcome to FilmKu!</Typography>
          <Typography
            variant="h4"
            components="h2"
            style={{ fontWeight: '300 !important' }}
          >
            Discover millions of movies and games.
          </Typography>
          <br />
          <br />
          <br />
          <br />
          <Button
            onClick={() => {
              history.push('/home');
            }}
            variant="outlined"
            style={{ color: 'white', borderColor: 'white' }}
          >
            GET STARTED
          </Button>
        </div>
        <Carousel indicatorIconButtonProps={{ style: { display: 'none' } }}>
          <img
            src="https://thevarsityshow1.files.wordpress.com/2018/05/avengers-infinity-war-wallpaper.jpg"
            className="carousel-image"
            alt="Carousel Item"
            style={authContext.isLoggedIn ? { width: '100%' } : null}
          />
          <img
            src="https://wallpaperaccess.com/full/504543.jpg"
            className="carousel-image"
            alt="Carousel Item"
            style={authContext.isLoggedIn ? { width: '100%' } : null}
          />
          <img
            src="http://getwallpapers.com/wallpaper/full/6/4/3/1208732-amazing-force-awakens-4k-wallpaper-3840x2160.jpg"
            className="carousel-image"
            alt="Carousel Item"
            style={authContext.isLoggedIn ? { width: '100%' } : null}
          />
          <img
            src="http://1.bp.blogspot.com/-h0Ilav2h83s/VYWIfWjaQVI/AAAAAAAAImA/d8oCYkB7Nag/s1600/batman.jpg"
            className="carousel-image"
            alt="Carousel Item"
            style={authContext.isLoggedIn ? { width: '100%' } : null}
          />
          <img
            src="https://www.wallpapertip.com/wmimgs/76-767910_ultra-hd-assassins-creed-wallpaper-hd.jpg"
            className="carousel-image"
            alt="Carousel Item"
            style={authContext.isLoggedIn ? { width: '100%' } : null}
          />
        </Carousel>
        <div
          style={
            authContext.isLoggedIn
              ? {
                  width: 'calc(100% - 240px)',
                  color: 'white',
                  position: 'absolute',
                  bottom: '0',
                  marginBottom: '20px',
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
      </div>
    </section>
  );
};

export default Welcome;
