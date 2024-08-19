import { FormControlLabel, Grid, Radio, RadioGroup, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePageMeta } from '../../hooks/pageTitle';


const states: { [key: string]: string } = {
  'Baden-Württemberg': 'baden-wuerttemberg',
  'Bayern': 'bayern',
  'Berlin': 'berlin',
  'Brandenburg': 'brandenburg',
  'Bremen': 'bremen',
  'Hamburg': 'hamburg',
  'Hessen': 'hessen',
  'Mecklenburg-Vorpommern': 'mecklenburg-vorpommern',
  'Niedersachsen': 'niedersachsen',
  'Nordrhein-Westfalen': 'nordrhein-westfalen',
  'Rheinland-Pfalz': 'rheinland-pfalz',
  'Saarland': 'saarland',
  'Sachsen': 'sachsen',
  'Sachsen-Anhalt': 'sachsen-anhalt',
  'Schleswig-Holstein': 'schleswig-holstein',
  'Thüringen': 'thueringen'
};

const StateIndexRoute: React.FC = () => {
  const navigate = useNavigate();

  usePageMeta({
    title: 'Bundesländer | Einbürgerungstest',
    description: 'Lernen Sie die Bundesländer Deutschlands kennen und bereiten Sie sich auf den spezifischen Teil des Einbürgerungstests vor.',
  });

  return (
    <>
      <Typography variant="h5" fontWeight={500} marginBottom={6}>
        Bundeslandauswahl
      </Typography>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
        onChange={(e) => navigate(`/states/${states[e.target.value]}`)}
      >
        <Grid container >
          {Object.keys(states).map((state) => (
            <Grid item xs={6} md={4} key={state}>
              <FormControlLabel
                value={state}
                control={<Radio color="warning" />}
                label={state}
              />
            </Grid>
          ))}
        </Grid>
      </RadioGroup>
    </>
  );
};

export default StateIndexRoute;
