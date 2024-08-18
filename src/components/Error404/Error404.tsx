import { Typography } from '@mui/material';
import styles from './styles.module.scss';

const Error404: React.FC = () => {
  return (
    <div className={styles.Error404}>
      <div className={styles.content}>
        <Typography variant='h1' fontWeight={600}>
          4
        </Typography>
        <img
          src='/static/images/404.webp'
          loading="eager"
          width={100}
        />
        <Typography variant='h1' fontWeight={600}>
          4
        </Typography>
      </div>
      <Typography variant='h5' fontWeight={500}>
        Die Seite, die du suchst, existiert nicht
      </Typography>
    </div>
  );
};

export default Error404;
