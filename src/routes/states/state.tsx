import { Container, Divider } from '@mui/material';
import React from 'react';
import QuestionComponent from '../../components/Question/Question';

import badenWuerttembergData from '../../data/states/baden-wuerttemberg.json';
import bayernData from '../../data/states/bayern.json';
import berlinData from '../../data/states/berlin.json';
import brandenburgData from '../../data/states/brandenburg.json';
import bremenData from '../../data/states/bremen.json';
import hamburgData from '../../data/states/hamburg.json';
import hessenData from '../../data/states/hessen.json';
import mecklenburgVorpommernData from '../../data/states/mecklenburg-vorpommern.json';
import niedersachsenData from '../../data/states/niedersachsen.json';
import nordrheinWestfalenData from '../../data/states/nordrhein-westfalen.json';
import rheinlandPfalzData from '../../data/states/rheinland-pfalz.json';
import saarlandData from '../../data/states/saarland.json';
import sachsenData from '../../data/states/sachsen.json';
import sachsenAnhaltData from '../../data/states/sachsen-anhalt.json';
import schleswigHolsteinData from '../../data/states/schleswig-holstein.json';
import thueringenData from '../../data/states/thueringen.json';
import { useNavigate, useParams } from 'react-router-dom';
import { Question } from '../../types';

const stateData: { [key: string]: Question[] } = {
  'baden-wuerttemberg': badenWuerttembergData,
  'bayern': bayernData,
  'berlin': berlinData,
  'brandenburg': brandenburgData,
  'bremen': bremenData,
  'hamburg': hamburgData,
  'hessen': hessenData,
  'mecklenburg-vorpommern': mecklenburgVorpommernData,
  'niedersachsen': niedersachsenData,
  'nordrhein-westfalen': nordrheinWestfalenData,
  'rheinland-pfalz': rheinlandPfalzData,
  'saarland': saarlandData,
  'sachsen': sachsenData,
  'sachsen-anhalt': sachsenAnhaltData,
  'schleswig-holstein': schleswigHolsteinData,
  'thueringen': thueringenData
};

const SpecificStateRoute: React.FC = () => {
  const { state } = useParams();
  const navigate = useNavigate();

  if (!state) {
    navigate('/404');
    return null;
  }

  return (
    <>
      {stateData[state].map((question) => (
        <React.Fragment key={question.id}>
          <QuestionComponent
            question={question}
            state={state}
          />
          <Container maxWidth="md">
            <Divider sx={{ marginY: 5 }} />
          </Container>
        </React.Fragment>
      ))}
    </>
  );
};

export default SpecificStateRoute;
