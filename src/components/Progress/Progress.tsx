import { LinearProgress } from '@mui/material';

interface ProgressProps {
  current: number;
  total: number;
}

const Progress: React.FC<ProgressProps> = ({ current, total }) => {
  const progress = (current / total) * 100;
  return (
    <LinearProgress
      variant="determinate"
      value={progress}
      color="success"
    />
  );
};

export default Progress;
