import {
  TextField,
  Typography,
  Button,
  Grid,
  IconButton,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuthentication } from "../utils/authentication";
import { remoteAuthService } from "../utils/remoteAuth";
import "./styles.css";

const Home = () => {
  const history = useHistory();
  const [Form, setForm] = useState({});
  const [Error, setError] = useState("");
  const { login, logout } = useAuthentication();
  const [ isRegisterFormShow, setRegisterFormShow ] = useState(false);

  const handleInputChange = (key, value) => {
    let temp = { ...Form };
    temp[key] = value;
    setForm(temp);
  };

  const handleSubmit = () => {
    if (Form.username && Form.password) {
      remoteAuthService(Form)
        .then((value) => {
          login(value);
          history.replace("/products");
        })
        .catch((err) => setError(err));
    } else {
      setError("Username or Password cannot be empty!");
    }
  };

  return (
    <div style={{ marginTop: 100, overflow: "hidden" }}>
      <Grid container spacing={3}>
        <Grid item sm={8}>
          <div className="loginBackground" />
        </Grid>
        <Grid
          item
          sm={4}
          style={{
            padding: 50,
            height: "60vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
          alignItem="center"
          justify="center"
        >
          {
            isRegisterFormShow ? (<>
          <Typography variant="h3">Registration</Typography>
          <TextField
            label="Name"
            placeholder="admin"
            fullWidth
            variant="outlined"
            // helperText="Enter admin"
            required
            onChange={(ev) => handleInputChange("name", ev.target.value)}
            margin="dense"
          />
          <TextField
            label="Username"
            placeholder="admin"
            fullWidth
            variant="outlined"
            // helperText="Enter admin"
            required
            onChange={(ev) => handleInputChange("username", ev.target.value)}
            margin="dense"
          />
          <TextField
            label="Password"
            required
            // helperText="Enter admin"
            type="password"
            fullWidth
            variant="outlined"
            onChange={(ev) => handleInputChange("password", ev.target.value)}
            margin="dense"
          />

          <TextField
            label="Confirm Password"
            required
            // helperText="Enter admin"
            type="password"
            fullWidth
            variant="outlined"
            onChange={(ev) => handleInputChange("confirmPassword", ev.target.value)}
            margin="dense"
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
          >
            Registration
          </Button>
          <div style={{margin: '4px 0 0 0', alignSelf: 'flex-start'}}>
            Go Back? 
            <Button onClick={()=> {
              setRegisterFormShow(false);
          }} style={{color: 'blue'}}>
            LogIn!
            </Button>
          </div>
          {Error && (
            <Alert
              severity="error"
              style={{ marginTop: 20 }}
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setError("");
                  }}
                >
                  <Close fontSize="inherit" />
                </IconButton>
              }
            >
              {Error}
            </Alert>
          )}
            </>) : (<>
              <Typography variant="h2">Login</Typography>
          <TextField
            label="Username"
            placeholder="admin"
            fullWidth
            variant="outlined"
            // helperText="Enter admin"
            required
            onChange={(ev) => handleInputChange("username", ev.target.value)}
            margin="dense"
          />

          <TextField
            label="Password"
            required
            // helperText="Enter admin"
            type="password"
            fullWidth
            variant="outlined"
            onChange={(ev) => handleInputChange("password", ev.target.value)}
            margin="dense"
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
          >
            Login
          </Button>
          <div style={{margin: '4px 0 0 0', alignSelf: 'flex-start'}}>
            No account? 
            <Button onClick={()=> {
              setRegisterFormShow(true);
          }} style={{color: 'blue'}}>
            Create one!
            </Button>
          </div>
          {Error && (
            <Alert
              severity="error"
              style={{ marginTop: 20 }}
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setError("");
                  }}
                >
                  <Close fontSize="inherit" />
                </IconButton>
              }
            >
              {Error}
            </Alert>
          )}
            </>) 
          }
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;