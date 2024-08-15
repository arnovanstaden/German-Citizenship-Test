import { useNavigate, useParams } from 'react-router-dom';
import questionData from '../data/de.json';
import Question from '../components/Question/Question';
import NextQuestionTimer from '../components/NextQuestionTimer/NextQuestionTimer';
import { useState } from 'react';
import { Container } from '@mui/material';

const QuizRoute: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [chosen, setChosen] = useState(false);

  if (!id || isNaN(parseInt(id))) {
    navigate('/404')
    return null;
  }

  const question = questionData.find((q) => q.id === parseInt(id));

  if (!question) {
    navigate('/404')
    return null;
  };

  const onDoneWaiting = () => {
    setChosen(false);
    navigate(`/quiz/${question.id + 1}`);
  };

  return (
    <>
      <Question
        question={question}
        onChosen={() => setChosen(true)}
      />
      {chosen && (
        <Container
          maxWidth="md"
        >
          <NextQuestionTimer
            start={chosen}
            seconds={1.75}
            onDone={onDoneWaiting}
          />
        </Container>
      )}
    </>
  )
};

export default QuizRoute;
