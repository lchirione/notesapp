import { Grid, CircularProgress, Typography } from "@mui/material";

export const CheckingAuth = () => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh", backgroundColor: "primary.main", padding: 4 }}
    >
      <Grid
        container
        direction="column"
        justifyContent="center"
        sx={{ display: "flex", alignItems: "center" }}
      >
        <Typography
          color="white"
          sx={{ fontSize: "1.5rem", marginBottom: "1rem", textAlign: "center" }}
        >
          Loading
        </Typography>
        <CircularProgress
          color="warning"
          sx={{ alignSelf: "center", justifyContent: "center" }}
        />
      </Grid>
    </Grid>
  );
};
