import questionData from '../data/de.json';
import Question from '../components/Question/Question';
import { Container, Divider, Grid } from '@mui/material';

const WrongRoute: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Grid container>
        {questionData.map((question) => (
          <Grid item xs={12} key={question.id}>
            <Question {...question} />
            <Divider sx={{ marginBottom: 15 }} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
};

export default WrongRoute;
