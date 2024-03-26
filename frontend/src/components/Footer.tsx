import { AppBar, Container, Box } from "@mui/material";
import { FooterMenu } from "./ButtonAggregation";

const Footer = () => {
  return (
    <AppBar
      component="footer"
      position="fixed"
      sx={{ backgroundColor: "white", height: "7vh", marginTop: "93vh" }}
    >
      <Container maxWidth="md">
        <Box sx={{ marginTop: "1vh" }}>
          <FooterMenu />
        </Box>
      </Container>
    </AppBar>
  );
};

export default Footer;
