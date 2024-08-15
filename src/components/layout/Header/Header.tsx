import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header>
      <Link
        to="/"
        style={{
          display: 'inline-block',
        }}
      >
        <Typography variant="h5" fontWeight={600} paddingY={2}>
          <span>🇩🇪 {' '}</span>
          Einbürgerungstest
        </Typography>
      </Link>
    </header>
  );
};

export default Header;
