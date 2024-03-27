import React from "react";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import { Container, Box } from "@mui/material";

const Header: React.FC = () => {
  return (
    <AppBar
      component="header"
      position="fixed"
      sx={{ height: "7vh", backgroundColor: "white" }}
    >
      <Container sx={{width:"100vw"}}>
        <Box
          width="100vw"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            position: "fixed",
          }}
        >
          <Typography
            component="h1"
            fontSize="2rem"
            sx={{
              color: "black",
              marginLeft: "35vw",
              marginTop: "3vw",
              fontFamily: "Impact",
            }}
          >
            BeInGo
          </Typography>
        </Box>
      </Container>
    </AppBar>
  );
};

export default Header;
