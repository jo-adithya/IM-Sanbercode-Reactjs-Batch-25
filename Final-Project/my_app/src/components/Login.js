import { useState, useRef, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

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

const Login = () => {
  const history = useHistory();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const nameInputRef = useRef();
  const confirmPasswordRef = useRef();
  const classes = useStyles();

  const authContext = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeAuth = () => {
    setIsLogin((prevState) => !prevState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let enteredName;
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    let enteredConfirmPassword;

    if (!isLogin) {
      enteredName = nameInputRef.current.value;
      enteredConfirmPassword = confirmPasswordRef.current.value;
    }

    // Optional: Add Validation
    if (enteredPassword !== enteredConfirmPassword && !isLogin) {
      return;
    }

    setIsLoading(true);
    if (isLogin) {
      let url = `https://backendexample.sanbersy.com/api/user-login`;
      axios
        .post(url, { email: enteredEmail, password: enteredPassword })
        .then((res) => {
          setIsLoading(false);
          authContext.login(res.data.token, res.data.user.name);
          history.replace('/');
        })
        .catch((error) => {
          setIsLoading(false);
          alert(error.response.data.error);
        });
    } else {
      let url = `https://backendexample.sanbersy.com/api/register`;
      axios
        .post(url, {
          name: enteredName,
          email: enteredEmail,
          password: enteredPassword,
        })
        .then((res) => {
          setIsLoading(false);
          authContext.login(res.data.token, res.data.user.name);
          history.replace('/');
        })
        .catch((error) => {
          setIsLoading(false);
          console.log(error.response.data.error);
        });
    }

    // axios({
    //   url: url,
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   data: {
    //     email: enteredEmail,
    //     password: enteredPassword,
    //     returnSecureToken: true,
    //   },
    // })
    //   .then(async (res) => {
    //     setIsLoading(false);
    //     const expTime = new Date(
    //       new Date().getTime() + +res.data.expiresIn * 1000
    //     );
    //     authContext.login(res.data.idToken, expTime.getTime(), name);
    //     history.replace('/');
    //   })
    //   .catch((error) => {
    //     setIsLoading(false);
    //     if (error.response) {
    //       alert(error.response.data.error.message);
    //     } else {
    //       alert('Authentication Error!');
    //     }
    //   });
  };

  return (
    <>
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'rgba(21,21,21,0.85)',
          zIndex: '1',
          padding: '50px',
          borderRadius: '10px',
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
          {isLogin ? 'Sign In' : 'Sign Up'}
        </Typography>
        <form
          className=""
          noValidate
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          {!isLogin ? (
            <>
              <TextField
                variant="outlined"
                margin="normal"
                required
                id="name"
                label="Name"
                name="name"
                autoFocus
                color="secondary"
                className={classes.root}
                inputRef={nameInputRef}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                id="email"
                label="Email Address"
                name="email"
                color="secondary"
                className={classes.root}
                inputRef={emailInputRef}
              />{' '}
            </>
          ) : (
            <TextField
              variant="outlined"
              margin="normal"
              required
              id="email"
              label="Email Address"
              name="email"
              color="secondary"
              autoFocus
              className={classes.root}
              inputRef={emailInputRef}
            />
          )}
          <TextField
            variant="outlined"
            margin="normal"
            required
            name="password"
            label="Password"
            type="password"
            id="password"
            color="secondary"
            className={classes.root}
            style={{ width: '350px' }}
            inputRef={passwordInputRef}
          />
          {!isLogin && (
            <TextField
              variant="outlined"
              margin="normal"
              required
              name="confirm-password"
              label="Confirm Password"
              type="password"
              id="confirm-password"
              color="secondary"
              className={classes.root}
              style={{ width: '350px' }}
              inputRef={confirmPasswordRef}
            />
          )}
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
            {isLogin ? 'Sign In' : 'Sign Up'}
          </Button>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              <Button
                color="secondary"
                style={{ textTransform: 'none' }}
                onClick={handleChangeAuth}
              >
                <Typography variant="body2">
                  {isLogin
                    ? "Don't have an account? Sign Up"
                    : 'Already have an account? Sign In'}
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
      <img
        className="carousel-image"
        alt="background"
        src="https://i.pinimg.com/originals/d7/81/70/d781702860c7a3ef484c99bc8f55d726.jpg"
        style={{ opacity: 0.3 }}
      />
    </>
  );
};

export default Login;
