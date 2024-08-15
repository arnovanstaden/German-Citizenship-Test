import questionData from '../data/de.json';
import Question from '../components/Question/Question';
import { Container, Divider, Grid, Typography } from '@mui/material';
import { useBookmarks } from '../hooks/bookmarks';

const BookmarkedRoute: React.FC = () => {
  const { bookmarks } = useBookmarks();

  const bookmarkedQuestions = questionData.filter((question) => bookmarks.includes(question.id));

  return (
    <Grid container>
      {bookmarkedQuestions.length > 0
        ? bookmarkedQuestions.map((question) => (
          <Grid item xs={12} key={question.id}>
            <Question
              question={question}
            />
            <Container maxWidth="md">
              <Divider sx={{ marginY: 10 }} />
            </Container>
          </Grid>
        ))
        : (
          <Grid item xs={12}>
            <Typography variant="h6" align="center">
              Keine Lesezeichen vorhanden
            </Typography>
          </Grid>
        )}
    </Grid>
  );
};

export default BookmarkedRoute;
