import { Button, Divider, Grid, TextField, Typography } from '@mui/material';
import { useQuiz } from '../../hooks/quiz';
import { useState } from 'react';

const QuizIndexRoute: React.FC = () => {
  const [amount, setAmount] = useState<number>(300);
  const { quizSettings, startQuiz } = useQuiz();
  const wrongAmount = quizSettings.questionCount < 1 || quizSettings.questionCount > 300;

  const handleUpdateAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value));
  };

  return (
    <>
      <Typography variant="h5" fontWeight={500} marginBottom={6}>
        Quiz-Einstellungen
      </Typography>
      <Grid container spacing={2} >
        <Grid item xs={12} sm={9}>
          <Typography
            variant="h6"
            fontWeight={500}
          >
            Anzahl der Fragen
          </Typography>
        </Grid>
        <Grid item xs={12} sm={3} display="flex" justifyContent="flex-end">
          <TextField
            color="warning"
            fullWidth
            error={wrongAmount}
            type="number"
            value={amount}
            onChange={handleUpdateAmount}
            inputProps={{
              min: 1,
              max: 300,
            }}
            helperText={wrongAmount ? 'Die Anzahl der Fragen muss zwischen 1 und 300 liegen' : 'Ein Wert zwischen 1 und 300'}
          />
        </Grid>
      </Grid>

      <Divider
        sx={{
          marginTop: 4,
          marginBottom: 4,
        }}
      />

      <Grid container justifyContent="flex-end" marginTop={4}>
        <Button
          variant="contained"
          color="warning"
          disabled={wrongAmount}
          onClick={() => startQuiz(amount)}
        >
          Quiz starten
        </Button>
      </Grid>
    </>
  );
};

export default QuizIndexRoute;
