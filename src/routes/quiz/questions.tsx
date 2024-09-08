import { useNavigate, useParams } from 'react-router-dom';
import questionData from '../../data/all.json';
import Question from '../../components/Question/Question';
import NextQuestionTimer from '../../components/NextQuestionTimer/NextQuestionTimer';
import { useContext, useState } from 'react';
import { Container } from '@mui/material';
import QuizProgress from '../../components/QuizProgress/QuizProgress';
import { QuizContext } from '../../context/quiz';

const QuizQuestionsRoute: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [chosen, setChosen] = useState(false);
  const [chosenCorrect, setChosenCorrect] = useState(false);

  const { handleNextQuestion, quizSettings } = useContext(QuizContext);

  if (!id || isNaN(parseInt(id))) {
    navigate('/404');
    return null;
  }

  const question = questionData.find((q) => q.id === parseInt(id));

  if (!question) {
    navigate('/404');
    return null;
  };

  const handleChosen = (_: unknown, correct: boolean) => {
    setChosen(true);
    setChosenCorrect(correct);
  };

  const onDoneWaiting = () => {
    handleNextQuestion(chosenCorrect);
    setChosen(false);
    setChosenCorrect(false);
  };

  const progress = {
    current: quizSettings.askedQuestions.length,
    total: quizSettings.questionCount,
  };

  return (
    <>
      <Container maxWidth="md" sx={{ marginBottom: 2 }}>
        <QuizProgress {...progress} />
      </Container>
      <Question
        question={question}
        onChosen={handleChosen}
        shuffleOptions
      />
      {chosen && (
        <Container maxWidth="md">
          <NextQuestionTimer
            start={chosen}
            seconds={1.75}
            onDone={onDoneWaiting}
          />
        </Container>
      )}
    </>
  );
};

export default QuizQuestionsRoute;
