import { StarOutlined } from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";
import React from "react";

export const NothingSelectedView = () => {
  return (
    <Grid
      className="animate__animated animate__pulse animate__faster"
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        minHeight: "calc(100vh - 110px)",
        backgroundColor: "primary.main",
        borderRadius: 3,
      }}
    >
      <Grid item xs={12}>
        <StarOutlined sx={{ fontSize: 100, color: "white" }} />
      </Grid>

      <Grid item xs={12}>
        <Typography color="white" variant="h5" align="center">
        Seleccione o agregue una nota
        </Typography>
      </Grid>
    </Grid>
  );
};
