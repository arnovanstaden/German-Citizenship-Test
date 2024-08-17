import { ThemeProvider } from '@emotion/react';
import { Outlet } from 'react-router-dom';
import theme from '../theme';
import { Container, CssBaseline } from '@mui/material';
import Header from '../components/Header/Header';

const Layout: React.FC = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Header />
        <main>
          <Container maxWidth="lg">
            <Outlet />
          </Container>
        </main>
        <CssBaseline />
      </ThemeProvider>
    </>
  );
};

export default Layout;
