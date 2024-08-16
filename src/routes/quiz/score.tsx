import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../../hooks/quiz';
import { Button } from '@mui/material';
import { useEffect } from 'react';

const QuizScoreRoute: React.FC = () => {
  const { resetQuizSettings, quizEnded } = useQuiz();
  const navigate = useNavigate();

  useEffect(() => {
    if (!quizEnded) {
      navigate('/quiz');
    }
  }, [quizEnded, navigate]);

  return (
    <div>
      <Button
        onClick={resetQuizSettings}
        variant='contained'
        color='success'
      >
        Weiter
      </Button>
    </div>
  );
};

export default QuizScoreRoute;
