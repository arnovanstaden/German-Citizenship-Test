import { LinearProgress } from '@mui/material';
import { useEffect, useState, useRef } from 'react';

interface Props {
  start: boolean;
  seconds: number;
  onDone: () => void;
}

const Timer: React.FC<Props> = ({ start, seconds, onDone }) => {
  const [progress, setProgress] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!start) return;

    const duration = seconds * 1000;

    const updateProgress = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);

      if (newProgress < 100) {
        animationFrameRef.current = requestAnimationFrame(updateProgress);
      }
    };

    animationFrameRef.current = requestAnimationFrame(updateProgress);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [start, seconds]);

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        onDone();
      }, 500)
    }
  }, [progress, onDone]);

  useEffect(() => {
    if (!start) {
      setProgress(0);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      startTimeRef.current = null;
    }
  }, [start]);

  return <LinearProgress variant="determinate" value={progress} />;
};

export default Timer;