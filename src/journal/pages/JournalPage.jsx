import { useDispatch, useSelector } from "react-redux";
import { AddOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { startNewNote } from "../../store/journal/thunks";
import { JournalLayout } from "../layout/JournalLayout";
import { NoteView, NothingSelectedView } from "../views";

export const JournalPage = () => {
  const dispatch = useDispatch();
  const { isSaving, active } = useSelector((state) => state.journal);

  const handleClick = () => {
    dispatch(startNewNote());
  };

  return (
    <JournalLayout>
      {active !== null ? <NoteView /> : <NothingSelectedView />}

      {/*  <NoteView /> */}

      <IconButton
        disabled={isSaving}
        onClick={handleClick}
        size="large"
        sx={{
          color: "white",
          backgroundColor: "error.main",
          ":hover": { backgroundColor: "error.main", opacity: 0.9 },
          ":disabled": { backgroundColor: "error.main", opacity: 0.6 },
          position: "fixed",
          right: 50,
          bottom: 50,
        }}
      >
        <AddOutlined />
      </IconButton>
    </JournalLayout>
  );
};
