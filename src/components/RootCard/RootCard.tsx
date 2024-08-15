import { Box, Typography } from '@mui/material';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';

interface RootCardProps {
  title: string;
  description: string;
  image: string;
  href: string;
}

const RootCard: React.FC<RootCardProps> = (props) => {
  return (
    <Link to={props.href} className={styles.IndexCard}>
      <Box className={styles.content}>
        <Typography variant="h5" fontWeight={500}>
          {props.title}
        </Typography>
        <Typography variant="subtitle1">
          {props.description}
        </Typography>
      </Box>
      <img
        className={styles.image}
        src={props.image}
        alt="German Flag"
        loading="eager"
      />
    </Link>
  );
};

export default RootCard;
