import { ThemeProvider } from '@emotion/react';
import { Outlet } from "react-router-dom";
import theme from '../theme';
import { Container, CssBaseline } from '@mui/material';
import Header from '../components/layout/Header/Header';
import Footer from '../components/layout/Footer/Footer';

const Root: React.FC = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Container maxWidth="xl">
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
        </Container>
        <CssBaseline />
      </ThemeProvider>
    </>
  );
};

export default Root;
