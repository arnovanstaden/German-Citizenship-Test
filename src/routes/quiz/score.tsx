import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../../hooks/quiz';
import { Button } from '@mui/material';

const QuizScoreRoute: React.FC = () => {
  const { quizSettings, resetQuizSettings } = useQuiz();
  const navigate = useNavigate();

  if (quizSettings.askedQuestions.length !== quizSettings.questionCount) {
    navigate('/quiz');
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
