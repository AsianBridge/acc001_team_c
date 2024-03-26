import { AppBar, Container, Box } from "@mui/material";
import { FooterMenu } from "./ButtonAggregation";

const Footer = () => {
  return (
    <AppBar
      component="footer"
      position="static"
      sx={{ backgroundColor: "#1C1B1B", height: "6vh" }}
    >
      <Container maxWidth="md">
        <Box sx={{ textAlign: "center" }}>
          <FooterMenu />
        </Box>
      </Container>
    </AppBar>
  );
};

export default Footer;
