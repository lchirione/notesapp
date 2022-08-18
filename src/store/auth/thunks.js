import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import {
  LoginEmailPassword,
  logoutFirebase,
  registerWithEmailPassword,
  signInWithGoogle,
} from "../../firebase/provider";

import { clearNotes } from "../journal/journalSlice";
import { checkingCredentials, login, logout } from "./";

export const checkingAuthentication = (email, password) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  };
};

export const startGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const result = await signInWithGoogle();

    if (!result.ok) {
      dispatch(logout(result.errorMessage));
      Swal.fire("Error", "error when entering with google", "error");
      return;
    }

    dispatch(login(result));
  };
};

export const startCreateUserEmailPassword = ({
  email,
  password,
  displayName,
}) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const { ok, uid, photoURL, errorMessage } = await registerWithEmailPassword(
      { email, password, displayName }
    );

    if (!ok) {
      dispatch(logout());
      return Swal.fire("Error", "Error registering", "error");
    }

    dispatch(login({ uid, photoURL, email, displayName }));
  };
};

export const startLoginEmailPassword = ({ email, password }) => {
  return async (dispatch) => {
    const { ok, uid, displayName, photoURL, errorMessage } =
      await LoginEmailPassword({
        email,
        password,
      });

    if (!ok) {
      dispatch(logout(errorMessage));
      Swal.fire("Error", "Failed to login", "error");
      return;
    }

    dispatch(login({ uid, photoURL, email, displayName }));
  };
};

export const startLogOut = () => {
  return async (dispatch) => {
    try {
      await logoutFirebase();
      dispatch(logout({ errorMessage: null }));
      dispatch(clearNotes());
    } catch (error) {
      console.log(error);
    }
  };
};
