import { Box, Container, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import type { Question } from '../../types';
import { useEffect, useState } from 'react';
import Option from './Option';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import { useBookmarks } from '../../hooks/bookmarks';
import { useWrongAnswers } from '../../hooks/wrong';

interface QuestionProps {
  question: Question;
  onChoose?: (question: Question) => void;
}

const Question: React.FC<QuestionProps> = ({ question, ...props }) => {
  const [chosenOption, setChosenOption] = useState<string | undefined>(undefined);
  const { isBookmarked, handleAddBookmark, handleRemoveBookmark } = useBookmarks();
  const { addToWrongAnswers } = useWrongAnswers();

  useEffect(() => {
    setChosenOption(undefined);
  }, [question.id]);

  const correctAnswer = question.answer;

  const handleChoose = (option: string) => {
    if (chosenOption) return;
    setChosenOption(option);
    if (props.onChoose) {
      props.onChoose(question);
    }
    if (correctAnswer !== chosenOption) {
      console.log(correctAnswer, chosenOption)
      addToWrongAnswers(question)
    };
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >

      <Box
        display="flex"
        alignItems="flex-start"
        justifyContent="flex-end"
        marginBottom={2}
      >
        {isBookmarked(question.id)
          ? (
            <Tooltip title="Lesezeichen entfernen">
              <IconButton onClick={() => handleRemoveBookmark(question.id)}>
                <BookmarkRemoveIcon />
              </IconButton>
            </Tooltip>
          )
          : (
            <Tooltip title="Zu Lesezeichen speichern">
              <IconButton onClick={() => handleAddBookmark(question.id)}>
                <BookmarkAddOutlinedIcon />
              </IconButton>
            </Tooltip>
          )}
      </Box>
      <Typography variant="h5">
        {`${question.id}. ${question.question}`}
      </Typography>
      {question.questionImage && (
        <Box
          sx={{
            borderRadius: 2,
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            margin: '16px 0',
          }}
        >
          <img
            src={`/static/images/questions/${question.id}.png`}
            style={{ width: '75%', height: 'auto' }}
          />
        </Box>
      )}
      <Grid container spacing={2} paddingTop={5} marginBottom={4}>
        {question.options.map((option) => (
          <Grid item md={question.images ? 6 : 12} xs={12} key={option}>
            <Option
              onSelect={() => handleChoose(option)}
              disabled={!!chosenOption && option !== correctAnswer && chosenOption !== option}
              checked={chosenOption === option || (option === correctAnswer && !!chosenOption)}
              label={option}
              image={question.images}
              correct={!!chosenOption && correctAnswer === option}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Question;
