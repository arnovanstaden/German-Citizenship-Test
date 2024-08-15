import { Button, Divider, Grid, TextField, Typography } from '@mui/material';
import { useQuiz } from '../../hooks/quiz';
import { useState } from 'react';

const QuizIndexRoute: React.FC = () => {
  const [amount, setAmount] = useState<number | ''>(300);
  const { startQuiz } = useQuiz();


  const handleUpdateAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (value.startsWith('0')) {
      value = value.substring(0);
    };

    setAmount(isNaN(parseInt(e.target.value)) ? '' : parseInt(e.target.value));
  };

  const cannotProceed = !amount ? false : (amount < 1 || amount > 300);

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
            error={cannotProceed}
            type="number"
            value={amount}
            onChange={handleUpdateAmount}
            inputProps={{
              min: 1,
              max: 300,
            }}
            helperText={cannotProceed ? 'Die Anzahl der Fragen muss zwischen 1 und 300 liegen' : 'Ein Wert zwischen 1 und 300'}
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
          disabled={cannotProceed}
          onClick={() => startQuiz(amount || 300)}
        >
          Quiz starten
        </Button>
      </Grid>
    </>
  );
};

export default QuizIndexRoute;
