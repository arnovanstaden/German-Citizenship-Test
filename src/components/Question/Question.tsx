import { Container, Grid, Typography } from '@mui/material';
import type { Question } from '../../types';
import { useEffect, useState } from 'react';
import Option from './Option';
import { useNavigate } from 'react-router-dom';

const Question: React.FC<Question> = (question) => {
  const [answer, setAnswer] = useState<string | undefined>(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    if (!answer) return;

    setTimeout(() => {
      navigate(`/questions/${question.id + 1}`);
      setAnswer(undefined);
    }, 2000);
  }, [answer]);

  const correctAnswer = question.answer;

  const handleChoose = (option: string) => {
    if (answer) return;
    setAnswer(option);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h5">{question.question}</Typography>
      <Grid container spacing={2} paddingTop={5}>
        {Object.keys(question.options).map((option) => (
          <Grid item xs={12} key={option}>
            <Option
              onSelect={() => handleChoose(option)}
              disabled={!!answer && answer !== option}
              checked={answer === option}
              label={`${option}. ${question.options[option as keyof typeof question.options]}`}
              correct={!!answer && correctAnswer === option}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Question;
