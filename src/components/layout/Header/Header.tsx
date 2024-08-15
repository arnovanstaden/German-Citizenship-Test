import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header>
      <Link
        to="/"
        style={{
          color: 'unset',
          textDecoration: 'none',
          display: 'inline-block',
          cursor: 'pointer',
        }}
      >
        <Typography variant="h5" fontWeight={600} padding={2}>
          <span>🇩🇪 {' '}</span>
          Einbürgerungstest
        </Typography>
      </Link>
    </header>
  );
};

export default Header;
