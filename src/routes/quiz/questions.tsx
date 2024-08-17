import { useNavigate, useParams } from 'react-router-dom';
import questionData from '../../data/de.json';
import Question from '../../components/Question/Question';
import NextQuestionTimer from '../../components/NextQuestionTimer/NextQuestionTimer';
import { useState } from 'react';
import { Container, Grid, IconButton, Tooltip } from '@mui/material';
import { useQuiz } from '../../hooks/quiz';
import QuizProgress from '../../components/QuizProgress/QuizProgress';
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';

const QuizQuestionsRoute: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [chosen, setChosen] = useState(false);
  const [chosenCorrect, setChosenCorrect] = useState(false);
  const [showContinueQuizModal, setShowContinueQuizModal] = useState(false);

  const { handleNextQuestion, quizSettings, exitQuiz } = useQuiz();

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
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={10} sm={11}>
            <QuizProgress {...progress} />
          </Grid>
          <Grid item xs={2} sm={1} justifyContent="flex-end" display="flex">
            <Tooltip title="Quiz beenden">
              <IconButton onClick={() => setShowContinueQuizModal(true)}>
                <ExitToAppOutlinedIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Container>
      <Question
        question={question}
        onChosen={handleChosen}
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
      <ConfirmationModal
        title='Quiz beenden'
        description='Willst du dein aktuelles Quiz beenden? Alle Fortschritte gehen verloren.'
        open={showContinueQuizModal}
        onClose={() => setShowContinueQuizModal(false)}
        continueButton={{
          label: 'Quiz beenden',
          onClick: () => {
            setShowContinueQuizModal(false);
            exitQuiz('/quiz');
          },
          colour: 'error',
        }}
      />
    </>
  );
};

export default QuizQuestionsRoute;
