import { useEffect, useMemo, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Grid, Typography, TextField, IconButton } from "@mui/material";
import {
  DeleteOutlined,
  SaveOutlined,
  UploadOutlined,
} from "@mui/icons-material";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import { useForm } from "../../hooks/useForm";
import { setActiveNote } from "../../store/journal/journalSlice";
import { startDeletingNote, startSaveNote } from "../../store/journal/thunks";

export const NoteView = () => {
  const dispatch = useDispatch();
  const {
    active: note,
    messageSaved,
    isSaving,
  } = useSelector((state) => state.journal);

  const { body, title, date, onInputChange, formState } = useForm(note);

  console.log(formState);
  console.log(title);

  const dateString = useMemo(() => {
    const newDate = new Date(date);

    return newDate.toUTCString();
  }, [date]);

  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState]);

  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire("Updated note", messageSaved, "success");
    }
  }, [messageSaved]);

  const onSaveNote = () => {
    dispatch(startSaveNote());
  };

  const onDelete = () => {
    dispatch(startDeletingNote());
  };

  return (
    <Grid
      className="animate__animated animate__pulse animate__faster"
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 1 }}
    >
      <Grid item>
        <Typography fontSize="35" fontWeight="light">
          {dateString}
        </Typography>
      </Grid>

      <Grid item>
        <Button onClick={onSaveNote} sx={{ color: "primary", p: 2 }}>
          <SaveOutlined sx={{ md: { fontSize: 35 }, mr: 1 }} />
          Saved
        </Button>
      </Grid>

      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Enter a title"
          label="Title"
          name="title"
          value={title}
          onChange={onInputChange}
          sx={{ border: "none", mb: 1 }}
        />

        <TextField
          type="text"
          variant="filled"
          multiline
          fullWidth
          placeholder="What happened today?"
          label="Description"
          name="body"
          value={body}
          onChange={onInputChange}
          sx={{ border: "none", mb: 1 }}
          minRows={5}
        />
      </Grid>

      <Grid container justifyContent="end">
        <Button onClick={onDelete} sx={{ mt: 2 }} color="error">
          <DeleteOutlined />
          Delete
        </Button>
      </Grid>
    </Grid>
  );
};
