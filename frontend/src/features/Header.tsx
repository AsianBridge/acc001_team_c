import React from "react";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

const Header: React.FC = () => {
  return (
    <AppBar
      component="header"
      position="fixed"
      sx={{ height: "7vh", backgroundColor: "white",display: "flex", alignItems: "center", justifyContent: "center",}}
    >
      <Box>
        <Typography
          component="h1"
          variant="h6"
          sx={{
            color: "black",
            fontFamily: "Impact",
            fontSize: "min(7vw, 2rem)",
            textAlign: "center",
          }}
        >
          BeInGo
        </Typography>
      </Box>
    </AppBar>
  );
};

export default Header;
