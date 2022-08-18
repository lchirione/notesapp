import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { TurnedInNot } from "@mui/icons-material";
import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { setActiveNote } from "../../store/journal/journalSlice";

export const SidebarItem = ({ title = "", body, id, date, imageUrls = [] }) => {
  const dispatch = useDispatch();
  const newTitle = useMemo(() => {
    return title.length > 17 ? title.substring(0, 17) + "..." : title;
  }, [title]);

  const handleButtonClick = () => {
    dispatch(setActiveNote({ title, body, id, date, imageUrls }));
  };

  return (
    <div>
      <ListItem disablePadding className="ItemList">
        <ListItemButton onClick={handleButtonClick}>
          <ListItemIcon>
            <TurnedInNot />
          </ListItemIcon>

          <Grid container>
            <ListItemText
              primary={newTitle}
              sx={{ display: "block", width: "100%" }}
            />
            <ListItemText secondary={body} />
          </Grid>
        </ListItemButton>
      </ListItem>
    </div>
  );
};
