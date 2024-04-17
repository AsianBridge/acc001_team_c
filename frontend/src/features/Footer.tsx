import { AppBar, Container, Box, Grid } from "@mui/material";
import {
  HomeButton,
  MyAccountButton,
  MyBingoButton,
} from "../components/Button";

const Footer = () => {
  return (
    <AppBar
      component="footer"
      position="fixed"
      sx={{ backgroundColor: "white", height: "100vh", marginTop: "90vh", textAlign:"center",}}
    >
      <Container maxWidth="md">
        <Box sx={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Grid container spacing={0}>
            <Grid item xs={4}>
              <HomeButton/>
            </Grid>
            <Grid item xs={4}>
              <MyBingoButton />
            </Grid>
            <Grid item xs={4}>
              <MyAccountButton />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </AppBar>
  );
};

export default Footer;
