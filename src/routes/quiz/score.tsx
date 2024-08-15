import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../../hooks/quiz';

const QuizScoreRoute: React.FC = () => {
  const { quizSettings } = useQuiz();
  const navigate = useNavigate();

  if (quizSettings.askedQuestions.length !== quizSettings.questionCount) {
    navigate('/quiz');
  }

  return (
    <div>
      score
    </div>
  );
};

export default QuizScoreRoute;
