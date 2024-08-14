import { Container, Grid, Typography } from '@mui/material';
import type { Question } from '../../types';
import { useState } from 'react';
import Option from './Option';
import { useNavigate } from 'react-router-dom';
import Timer from '../Timer/Timer';

const Question: React.FC<Question> = (question) => {
  const [answer, setAnswer] = useState<string | undefined>(undefined);
  const navigate = useNavigate();

  const onFinishWait = () => {
    navigate(`/questions/${question.id + 1}`);
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
      <Grid container spacing={2} paddingTop={5} marginBottom={2}>
        {question.options.map((option) => (
          <Grid item xs={12} key={option}>
            <Option
              onSelect={() => handleChoose(option)}
              disabled={!!answer && option !== correctAnswer && answer !== option}
              checked={answer === option || (option === correctAnswer && !!answer)}
              label={option}
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
