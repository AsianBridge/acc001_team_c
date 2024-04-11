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
      sx={{ backgroundColor: "white", height: "7vh", marginTop: "93vh" }}
    >
      <Container maxWidth="md">
        <Box sx={{ marginTop: "1vh" }}>
          <Grid container spacing={15}>
            <Grid item xs={4}>
              <HomeButton />
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
