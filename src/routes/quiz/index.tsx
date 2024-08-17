import { Button, Divider, FormControlLabel, Grid, Radio, RadioGroup, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { QuizContext } from '../../context/quiz';

const QuizIndexRoute: React.FC = () => {
  const [amount, setAmount] = useState<number | ''>(300);
  const { startQuiz } = useContext(QuizContext);

  return (
    <>
      <Typography variant="h5" fontWeight={500} marginBottom={6}>
        Quiz-Einstellungen
      </Typography>
      <Grid container spacing={2} >
        <Grid item xs={12} sm={8}>
          <Typography
            variant="h6"
            fontWeight={500}
          >
            Anzahl der Fragen
          </Typography>
        </Grid>

        <Grid item xs={12} sm={4} display="flex" justifyContent="flex-end">
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            onChange={(e) => setAmount(parseInt(e.target.value))}
            value={amount}
          >
            <Grid container >
              {[5, 10, 25, 50, 100, 150, 300].map((amount) => (
                <Grid item xs={amount === 300 ? 12 : 4} key={amount}>
                  <FormControlLabel
                    value={amount}
                    control={<Radio color="warning" />}
                    label={amount === 300 ? '300 (Alle Fragen)' : amount}
                  />
                </Grid>
              ))}
            </Grid>
          </RadioGroup>
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
          onClick={() => startQuiz(amount || 300)}
        >
          Quiz starten
        </Button>
      </Grid>
    </>
  );
};

export default QuizIndexRoute;
