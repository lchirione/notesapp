import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { firebaseDB } from "../../firebase/config";
import { fileUpload, loadNotes } from "../../helpers";
import {
  addNewEmptyNote,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotoToActiveNote,
  setSaving,
  updateNote,
} from "./journalSlice";

export const startNewNote = () => {
  return async (dispatch, getState) => {
    dispatch(savingNewNote());

    const { uid } = getState().auth;

    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
    };

    const newDoc = doc(collection(firebaseDB, `${uid}/journal/notes`));
    const setDocResp = await setDoc(newDoc, newNote);

    newNote.id = newDoc.id;

    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
  };
};

export const startLoadingNotes = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    if (!uid) throw new Error("UID not found");

    const notes = await loadNotes(uid);

    dispatch(setNotes(notes));
  };
};

export const startSaveNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving());
    const { uid } = getState().auth;
    const { active: notes } = getState().journal;

    console.log(notes);

    const noteToFirestore = { ...notes };
    delete noteToFirestore.id;

    const docRef = doc(firebaseDB, `${uid}/journal/notes/${notes.id}`);
    const updatedNote = await setDoc(docRef, noteToFirestore, { merge: true });

    dispatch(updateNote(noteToFirestore));

    dispatch(startLoadingNotes());
  };
};

export const startUploadingFiles = (files = []) => {
  return async (dispatch) => {
    dispatch(setSaving());

    const filesUploadPromises = [];

    for (const file of files) {
      filesUploadPromises.push(fileUpload(file));
    }

    const photosUrl = await Promise.all(filesUploadPromises);

    dispatch(setPhotoToActiveNote(photosUrl));
  };
};

export const startDeletingNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    const { active: note } = getState().journal;

    const docRef = doc(firebaseDB, `${uid}/journal/notes/${note.id}`);
    await deleteDoc(docRef);

    dispatch(deleteNoteById(note.id));
  };
};
