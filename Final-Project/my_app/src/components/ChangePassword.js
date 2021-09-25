import { useState, useRef, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import logo from '../static/images/app_logo.png';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: 'white',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#f50057',
    },
    '& .MuiInputLabel-root': {
      color: '#aaa',
    },
    '& .MuiFormLabel-colorSecondary.Mui-focused': {
      color: '#f50057 !important',
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const ChangePassword = () => {
  const history = useHistory();
  const oldPasswordInputRef = useRef();
  const newPasswordInputRef = useRef();
  const confirmPasswordRef = useRef();
  const classes = useStyles();

  const authContext = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const enteredOldPassword = oldPasswordInputRef.current.value;
    const enteredNewPassword = newPasswordInputRef.current.value;
    const enteredConfirmPassword = confirmPasswordRef.current.value;

    if (enteredNewPassword !== enteredConfirmPassword) {
      return;
    }

    setIsLoading(true);
    axios
      .post(
        'https://backendexample.sanbersy.com/api/change-password',
        {
          current_password: enteredOldPassword,
          new_password: enteredNewPassword,
          new_confirm_password: enteredConfirmPassword,
        },
        { headers: { Authorization: `Bearer ${authContext.token}` } }
      )
      .then(() => {
        history.replace('/');
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  return (
    <>
      <section style={{ height: '100vh' }}>
        <div className="filler"></div>
        <div
          style={{
            margin: 'auto',
            zIndex: '1',
            marginTop: '50vh',
            transform: 'translateY(-50%)',
          }}
        >
          <div
            style={{
              backgroundColor: 'rgba(21,21,21,0.85)',
              padding: '50px',
              borderRadius: '10px',
              margin: 'auto',
            }}
          >
            <Backdrop className={classes.backdrop} open={isLoading}>
              <CircularProgress color="secondary" />
            </Backdrop>
            <Typography
              variant="h2"
              color="secondary"
              style={{ marginBottom: '20px' }}
            >
              Change Password
            </Typography>
            <form
              className=""
              noValidate
              onSubmit={handleSubmit}
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <TextField
                variant="outlined"
                margin="normal"
                required
                type="password"
                id="old-password"
                label="Old Password"
                name="old-password"
                autoFocus
                color="secondary"
                className={classes.root}
                inputRef={oldPasswordInputRef}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                type="password"
                id="new-password"
                label="New Password"
                name="new-password"
                color="secondary"
                className={classes.root}
                inputRef={newPasswordInputRef}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                type="password"
                id="confirm-password"
                label="Confirm Password"
                name="confirm-password"
                color="secondary"
                className={classes.root}
                inputRef={confirmPasswordRef}
              />
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                className="button-submit"
                style={{
                  padding: '40px auto',
                  marginBottom: '20px',
                  marginTop: '30px',
                }}
              >
                Change Password
              </Button>
            </form>
          </div>
        </div>
      </section>
      <div
        style={{
          width: 'calc(100% - 240px)',
          color: 'white',
          position: 'absolute',
          bottom: '0',
          marginBottom: '20px',
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
      <img
        className="carousel-image"
        alt="background"
        src="https://i.pinimg.com/originals/d7/81/70/d781702860c7a3ef484c99bc8f55d726.jpg"
        style={{
          opacity: 0.3,
          position: 'absolute',
          top: '0',
          left: '0',
          zIndex: '0',
        }}
      />
    </>
  );
};

export default ChangePassword;
