import Question from '../components/Question/Question';
import { Box, Button, Container, Divider, Grid, Typography } from '@mui/material';
import { useWrongAnswers } from '../hooks/wrong';
import questionData from '../data/de.json';

const WrongRoute: React.FC = () => {
  const { wrongAnswers, removeFromWrongAnswers, clearAllWrongAnswers } = useWrongAnswers();
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
    <Grid container>

      {wrongQuestions.length > 0
        ? (
          <>
            <Container maxWidth="md" >
              <Box display="flex" justifyContent="flex-end" marginBottom={5}>
                <Button
                  variant='contained'
                  color='error'
                  onClick={clearAllWrongAnswers}
                >
                  Alle Fragen löschen
                </Button>
              </Box>
            </Container>
            {wrongQuestions.map((question) => (
              <Grid item xs={12} key={question.id}>
                <Question
                  question={question}
                  onChosen={onChosen}
                />
                <Container maxWidth="md">
                  <Divider sx={{ marginY: 10 }} />
                </Container>
              </Grid>
            ))}
          </>
        )
        : <Typography variant="h6">Keine falsch beantworteten Fragen</Typography>
      }
    </Grid>
  );
};

export default WrongRoute;
