import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { Google } from "@mui/icons-material";
import {
  Grid,
  Typography,
  TextField,
  Button,
  Link,
  Alert,
} from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";
import {
  checkingAuthentication,
  startGoogleSignIn,
  startLoginEmailPassword,
} from "../../store/auth";

const formData = {
  email: "",
  password: "",
};

export const LoginPage = () => {
  const { status, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { email, password, onInputChange } = useForm(formData);

  const isAuthenticating = useMemo(() => {
    status === "cheking";
  }, [status]);

  const handleSubmit = (e) => {
    e.preventDefault();

    /* dispatch(checkingAuthentication(email, password)); */
    if (email === "" || password === "") {
      return;
    } else {
      try {
        dispatch(startLoginEmailPassword({ email, password }));
      } catch (error) {
        console.log(error);
      }
    }
  };

  /* const handleGoogle = () => {
    console.log("google singIn");
    try {
      dispatch(startGoogleSignIn());
    } catch (error) {
      console.log(error);
    }
  }; */

  return (
    <AuthLayout title="Login">
      <form
        onSubmit={handleSubmit}
        className="animate__animated animate__fadeIn animate__faster"
      >
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Email"
              type="email"
              name="email"
              placeholder="Journal@gmail.com"
              fullWidth
              value={email}
              onChange={onInputChange}
              autoComplete="off"
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Password"
              type="password"
              name="password"
              placeholder="Password"
              fullWidth
              value={password}
              onChange={onInputChange}
              autoComplete="off"
            />
          </Grid>

          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} display={!!errorMessage ? "" : "none"}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12}>
              <Button
                disabled={isAuthenticating}
                type="submit"
                variant="contained"
                fullWidth
              >
                Login
              </Button>
            </Grid>

            {/* <Grid item xs={12} sm={6}>
              <Button
                disabled={isAuthenticating}
                onClick={handleGoogle}
                variant="contained"
                fullWidth
              >
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid> */}
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Link
              component={RouterLink}
              to="/auth/register"
              sx={{ cursor: "pointer" }}
            >
              Create an account
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
