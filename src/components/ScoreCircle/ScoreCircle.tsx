import { CircularProgress, CircularProgressProps, Typography } from '@mui/material';
import styles from './styles.module.scss';

const ScoreCircle: React.FC<{ score: number, total: number }> = ({ score, total }) => {
  let scoreRounded = Math.floor(((score / total) * 100));

  let colour;
  switch (true) {
    case (scoreRounded >= 75):
      colour = 'success';
      break;
    case (scoreRounded >= 50):
      colour = 'warning';
      break;
    default:
      colour = 'error';
      break;
  }

  if (scoreRounded === 0) {
    scoreRounded = 100;
    colour = 'error';
  }

  return (
    <div className={styles.ScoreCircle}>
      <CircularProgress
        value={scoreRounded}
        variant="determinate"
        size={275}
        color={colour as CircularProgressProps['color']}
      />
      <Typography className={styles.text} variant='h4'>
        {`${score} / ${total}`}
      </Typography>
    </div>
  );
};

export default ScoreCircle;
