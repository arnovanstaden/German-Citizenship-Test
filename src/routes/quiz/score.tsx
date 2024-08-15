import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../../hooks/quiz';
import { Button } from '@mui/material';

const QuizScoreRoute: React.FC = () => {
  const { resetQuizSettings, quizEnded } = useQuiz();
  const navigate = useNavigate();

  if (quizEnded) {
    navigate('/quiz');
    return null;
  }

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
