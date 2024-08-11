import { ThemeProvider } from '@emotion/react';
import { Outlet } from "react-router-dom";
import theme from '../theme';
import { CssBaseline } from '@mui/material';
import Header from '../components/layout/Header/Header';
import Footer from '../components/layout/Footer/Footer';

const Root: React.FC = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
        <CssBaseline />
      </ThemeProvider>
    </>
  );
};

export default Root;
