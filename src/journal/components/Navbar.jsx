import { useDispatch } from "react-redux";
import { MenuOutlined, LogoutOutlined } from "@mui/icons-material";
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material";
import { startLogOut } from "../../store/auth";
import { showNavbar } from "../../store/journal/journalSlice";

export const Navbar = ({ drawerWidth }) => {
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(startLogOut());
  };

  const handleClick = () => {
    dispatch(showNavbar());
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Toolbar>
        <IconButton
          onClick={handleClick}
          color="inherit"
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuOutlined />
        </IconButton>

        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6" noWrap component="div">
            JournalApp
          </Typography>

          <IconButton onClick={onLogout}>
            <LogoutOutlined
              sx={{
                color: "error.main",
                ":hover": { color: "error.main", opacity: 0.9 },
              }}
            />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
