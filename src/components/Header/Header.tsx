import { IconButton, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import styles from './styles.module.scss';
import { Home } from '@mui/icons-material';

const Header: React.FC = () => {
  const location = useLocation();
  return (
    <header className={styles.Header}>
      <Link
        to="/"
        style={{
          display: 'inline-block',
        }}
      >
        <Typography variant="h5" fontWeight={600}>
          <span>🇩🇪 {' '}</span>
          Einbürgerungstest
        </Typography>
      </Link>
      {location.pathname !== '/' && (
        <Link to="/">
          <IconButton
            disableRipple
          >
            <Home />
          </IconButton></Link>
      )}
    </header>
  );
};

export default Header;
