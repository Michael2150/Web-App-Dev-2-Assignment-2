import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const Header = (props ) => {
  const title = props.title

  return (
    <Paper 
      component="div" 
      sx={{
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
        marginBottom: 1.5,
      }}
      >
      <Typography variant="h4" component="h3">
        {title}
      </Typography>
   </Paper>
  );
};

export default Header;