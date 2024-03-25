import React from 'react';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import { Container, Box} from '@mui/material';

const Header: React.FC = () => {
  return (
    <AppBar component="header" position="static">
            <Container maxWidth="md">
                <Box sx={{ display: 'flex', justifyContent: 'space-between'}}>
                    <Box>
                        <Typography component="h1">
                          BeInGo
                        </Typography>
                    </Box>
                </Box>
            </Container>
        </AppBar>
  );
};

export default Header;