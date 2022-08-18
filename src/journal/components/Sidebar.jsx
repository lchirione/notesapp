import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  Toolbar,
  Typography,
} from "@mui/material";
import { SidebarItem } from "./SidebarItem";
import { showNavbar } from "../../store/journal/journalSlice";
import { CancelOutlined, MenuOutlined } from "@mui/icons-material";

export const Sidebar = ({ drawerWidth = 240 }) => {
  const dispatch = useDispatch();
  const { displayName } = useSelector((state) => state.auth);
  const { notes, navbar } = useSelector((state) => state.journal);

  const handleClick = () => {
    dispatch(showNavbar());
  };

  return (
    <Box
      component="nav"
      sx={{ with: { xs: "0px", sm: drawerWidth }, flexShrink: { sm: 0 } }}
      className={navbar === true ? "showNavbar" : "navbarHidden"}
    >
      <Drawer
        variant="permanent"
        open
        position="relative"
        sx={{
          display: { xs: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            position: "relative",
          },
        }}
      >
        <Toolbar
          sx={{
            display: { xs: "flex" },
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" noWrap component="div">
            {displayName}
          </Typography>

          <IconButton
            onClick={handleClick}
            color="inherit"
            sx={{ mr: 2, display: { sm: "none" }, fontSize: 100 }}
          >
            <CancelOutlined />
          </IconButton>
        </Toolbar>

        <Divider />

        <List>
          {notes.length !== 0 ? (
            notes.map((note) => <SidebarItem key={note.id} {...note} />)
          ) : (
            <p className="no-note">No notes</p>
          )}
        </List>
      </Drawer>
    </Box>
  );
};
