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
  onChosen?: (question: Question, correct: boolean) => void;
  withAnswerOnly?: boolean;
  state?: string;
  shuffleOptions?: boolean;
}

const Question: React.FC<QuestionProps> = ({ question, ...props }) => {
  const [chosenOption, setChosenOption] = useState<string | undefined>(undefined);
  const [shuffledOptions, setShuffledOptions] = useState(question.options);
  const { isBookmarked, handleAddBookmark, handleRemoveBookmark } = useBookmarks();
  const { addToWrongAnswers } = useWrongAnswers();

  useEffect(() => {
    if (props.shuffleOptions) {
      const shuffled = [...question.options].sort(() => Math.random() - 0.5);
      setShuffledOptions(shuffled);
    } else {
      setShuffledOptions(question.options);
    }
  }, [question, props.shuffleOptions]);

  useEffect(() => {
    return () => {
      setChosenOption(undefined);
    };
  }, [question.id]);

  const correctAnswer = question.answer;

  const handleChoose = (option: string) => {
    if (chosenOption) return;
    const isCorrect = option === correctAnswer;
    setChosenOption(option);
    if (props.onChosen) {
      props.onChosen(question, isCorrect);
    }
    if (!isCorrect) {
      addToWrongAnswers([question.id]);
    };
  };

  return (
    <Container maxWidth="md" sx={{ padding: 0 }}>
      <Grid container>
        <Grid item sm={11} xs={12}>
          <Typography variant="h5">
            {`${question.id}. ${question.question}`}
          </Typography>
        </Grid>
        <Grid item sm={1} xs={12}>
          <Box
            display="flex"
            alignItems="flex-start"
            justifyContent="flex-end"
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
        </Grid>
      </Grid>
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
            src={
              props.state
                ? `/static/images/states/${props.state}/${question.id}.webp`
                : `/static/images/questions/${question.id}.webp`
            }
            style={{ width: '75%', height: 'auto' }}
          />
        </Box>
      )}
      <Grid container spacing={2} paddingTop={5} marginBottom={2}>
        {!props.withAnswerOnly ? (
          shuffledOptions.map((option) => (
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
          ))
        ) : (
          <Grid item md={question.images ? 6 : 12} xs={12}>
            <Option
              onSelect={() => { }}
              disabled={false}
              checked={true}
              label={question.answer}
              image={question.images}
              correct={true}
            />
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Question;
