import Question from '../components/Question/Question';
import { Container, Divider, Grid, Typography } from '@mui/material';
import { useWrongAnswers } from '../hooks/wrong';
import questionData from '../data/de.json';

const WrongRoute: React.FC = () => {
  const { wrongAnswers, removeFromWrongAnswers } = useWrongAnswers();
  const sorted = wrongAnswers.sort((a, b) => a - b);
  const wrongQuestions = sorted.map((questionId) => questionData.find((q) => q.id === questionId)).filter((q) => q) as Question[];

  const onChosen = (question: Question, correct: boolean) => {
    if (correct) {
      // Remove the question from the wrong answers list
      setTimeout(() => {
        removeFromWrongAnswers(question.id);
      }, 3000);
    }
  };

  return (
    <Container maxWidth="md">
      <Grid container>
        {wrongQuestions.length > 0
          ? wrongQuestions.map((question) => (
            <Grid item xs={12} key={question.id}>
              <Question
                question={question}
                onChosen={onChosen}
              />
              <Divider sx={{ marginBottom: 15 }} />
            </Grid>
          ))
          : <Typography variant="h6">Keine falsch beantworteten Fragen</Typography>
        }
      </Grid>
    </Container>
  );
};

export default WrongRoute;
