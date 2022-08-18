import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startCreateUserEmailPassword } from "../../store/auth";
import { Link as RouterLink } from "react-router-dom";
import { Grid, TextField, Button, Link, Alert } from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";
import { AssignmentReturned } from "@mui/icons-material";

export const RegisterPage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    displayName: "",
  });

  const { email, password, displayName } = formValues;

  const dispatch = useDispatch();
  const { status, errorMessage } = useSelector((state) => state.auth);
  const isCheckingAuth = useMemo(() => {
    status === "checking";
  }, [status]);

  const formValidations = {
    email: [(value) => value.includes("@"), "The email should include a @"],
    password: [
      (value) => value.length >= 6,
      "Password must contain 6 characters",
    ],
    displayName: [(value) => value.length >= 1, "Name is required"],
  };

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (email === "" || displayName === "" || password === "") return;

    if (password.length <= 6) return;

    if (displayName.length < 1) return;

    setFormSubmitted(true);

    dispatch(startCreateUserEmailPassword(formValues));
  };

  return (
    <AuthLayout title="Register">
      <form
        onSubmit={handleRegister}
        className="animate__animated animate__fadeIn animate__faster"
      >
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Email"
              type="email"
              placeholder="Journal@gmail.com"
              fullWidth
              name="email"
              value={email}
              onChange={handleInputChange}
              /* error={!!emailValid && formSubmitted}
              helperText={emailValid} */
              autoComplete="off"
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Name"
              type="text"
              placeholder="Name"
              fullWidth
              name="displayName"
              value={displayName}
              onChange={handleInputChange}
              autoComplete="off"
              /* error={!!displayNameValid && formSubmitted}
              helperText={displayNameValid} */
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Password"
              type="password"
              placeholder="Password"
              fullWidth
              name="password"
              value={password}
              onChange={handleInputChange}
              autoComplete="off"
              /* error={!!passwordValid && formSubmitted}
              helperText={passwordValid} */
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} display={!!errorMessage ? "" : "none"}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>

            <Grid item xs={12}>
              <Button
                disabled={isCheckingAuth}
                type="submit"
                variant="contained"
                fullWidth
              >
                Register
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Link
              component={RouterLink}
              to="/auth/login"
              sx={{ cursor: "pointer" }}
            >
              You have an account?
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
