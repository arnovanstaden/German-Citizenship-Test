import { ThemeProvider } from '@emotion/react';
import { Outlet } from 'react-router-dom';
import theme from '../theme';
import { Container, CssBaseline, Grid } from '@mui/material';
import Header from '../components/layout/Header/Header';

const Layout: React.FC = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Container maxWidth="xl">
          <Grid
            container
            spacing={2}
            direction="column"
            justifyContent="center"
            paddingBottom={5}
          >
            <Grid item xs={12}>
              <Header />
            </Grid>
            <Grid item xs={12}>
              <main>
                <Outlet />
              </main>
            </Grid>
          </Grid>
        </Container>
        <CssBaseline />
      </ThemeProvider>
    </>
  );
};

export default Layout;
