import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../../hooks/quiz';
import { Button, Container } from '@mui/material';
import { useEffect } from 'react';
import ScoreCircle from '../../components/ScoreCircle/ScoreCircle';

const QuizScoreRoute: React.FC = () => {
  const { quizEnded, quizSettings, startQuiz, exitQuiz } = useQuiz();
  const navigate = useNavigate();

  useEffect(() => {
    if (!quizEnded) {
      navigate('/quiz');
    }
  }, [quizEnded, navigate]);

  return (
    <div>
      <Container
        maxWidth="md"
        sx={{
          display: 'grid',
          justifyContent: 'center',
          gap: 3,
          paddingTop: 5
        }}
      >
        <ScoreCircle
          score={quizSettings.correctAnswers.length}
          total={quizSettings.questionCount}
        />
        <Button
          onClick={() => exitQuiz('/')}
          variant='contained'
          color='success'
          fullWidth
          sx={{
            marginTop: 5
          }}
        >
          Home
        </Button>
        <Button
          onClick={() => startQuiz(quizSettings.questionCount)}
          variant='outlined'
          color='warning'
        >
          Erneut versuchen
        </Button>
        <Button
          onClick={() => exitQuiz('/quiz')}
          variant='contained'
          color='warning'
        >
          Neues Quiz
        </Button>
      </Container >
    </div >
  );
};

export default QuizScoreRoute;
