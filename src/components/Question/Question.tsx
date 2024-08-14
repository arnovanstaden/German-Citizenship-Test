import { Box, Container, Grid, Typography } from '@mui/material';
import type { Question } from '../../types';
import { useState } from 'react';
import Option from './Option';
import { useNavigate } from 'react-router-dom';
import Timer from '../Timer/Timer';

const Question: React.FC<Question> = (question) => {
  const [answer, setAnswer] = useState<string | undefined>(undefined);
  const navigate = useNavigate();

  const onFinishWait = () => {
    navigate(`/quiz/${question.id + 1}`);
    setAnswer(undefined);
  }

  const correctAnswer = question.answer;

  const handleChoose = (option: string) => {
    if (answer) return;
    setAnswer(option);
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
              disabled={!!answer && option !== correctAnswer && answer !== option}
              checked={answer === option || (option === correctAnswer && !!answer)}
              label={option}
              image={question.images}
              correct={!!answer && correctAnswer === option}
            />
          </Grid>
        ))}
      </Grid>
      {answer && <Timer start={!!answer} seconds={1.75} onDone={onFinishWait} />}
    </Container>
  );
};

export default Question;
