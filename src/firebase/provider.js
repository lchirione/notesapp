import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { firebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(firebaseAuth, googleProvider);

    const { displayName, email, photoURL, uid } = result.user;
    /* const credentials = GoogleAuthProvider.credentialFromResult(result); */

    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid,
    };
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;

    return {
      ok: false,
      errorCode,
      errorMessage,
    };
  }
};

export const registerWithEmailPassword = async ({
  email,
  password,
  displayName,
}) => {
  try {
    const resp = await createUserWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    console.log(resp);

    //update name in displayName
    await updateProfile(firebaseAuth.currentUser, { displayName });

    const { uid, photoURL } = resp.user;

    return {
      ok: true,
      uid,
      photoURL,
      email,
      displayName,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      errorMessage: error.message,
    };
  }
};

export const LoginEmailPassword = async ({ email, password }) => {
  try {
    const result = await signInWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );

    const { uid, photoURL, displayName } = result.user;

    return {
      ok: true,
      uid,
      photoURL,
      email,
      displayName,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      errorMessage: error.message,
    };
  }
};

export const logoutFirebase = async () => {
  return await firebaseAuth.signOut();
};
