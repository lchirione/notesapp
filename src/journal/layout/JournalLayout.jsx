import { Box, Toolbar } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Navbar, Sidebar } from "../components";

export const JournalLayout = ({ children }) => {
  const drawerWidth = 240;
  return (
    <Box
      sx={{ display: "flex" }}
      className="animate__animated animate__pulse animate__faster container-layout"
    >
      {/* Navbar */}
      <Navbar drawerWidth={drawerWidth} xs="400px" />

      {/* Sidebar */}
      <Sidebar drawerWidth={drawerWidth} />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};
