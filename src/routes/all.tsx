import questionData from '../data/de.json';
import Question from '../components/Question/Question';
import { Container, Divider, Grid } from '@mui/material';

const AllQuestionsRoute: React.FC = () => {
  const emptyOptions = questionData.filter((question) => question.options.length === 0);
  console.log('Empty options', emptyOptions);
  return (
    <Container maxWidth="md">
      <Grid container>
        {questionData.map((question) => (
          <Grid item xs={12} key={question.id}>
            <Question
              question={question}
            />
            <Divider sx={{ marginBottom: 15 }} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
};

export default AllQuestionsRoute;
