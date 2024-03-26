import React from "react";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import { Container, Box } from "@mui/material";

const Header: React.FC = () => {
  return (
    <AppBar component="header" position="static" sx={{ height: "4vh", backgroundColor: "#1C1B1B"}}>
      <Container>
        <Box width="100vw" sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography component="h1" fontSize="1.6rem" sx={{color :"#EDEDED", textAlign:"center"}}>BeInGo</Typography>
        </Box>
      </Container>
    </AppBar>
  );
};

export default Header;
