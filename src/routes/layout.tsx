import { ThemeProvider } from '@emotion/react';
import { Outlet } from 'react-router-dom';
import theme from '../theme';
import { Box, Container, CssBaseline } from '@mui/material';
import Header from '../components/layout/Header/Header';

const Layout: React.FC = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Container maxWidth="lg">
          <Box>
            <Header />
          </Box>
          <main>
            <Outlet />
          </main>
        </Container>
        <CssBaseline />
      </ThemeProvider>
    </>
  );
};

export default Layout;
