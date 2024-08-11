import { useNavigate, useParams } from 'react-router-dom';
import questionData from '../data/all.json';
import Question from '../components/Question/Question';

const QuestionRoute: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  if (!id || isNaN(parseInt(id))) {
    navigate('/404')
    return null;
  }

  const question = questionData.find((q) => q.id === parseInt(id));

  if (!question) {
    navigate('/404')
    return null;
  }

  return <Question {...question} />
};

export default QuestionRoute;
