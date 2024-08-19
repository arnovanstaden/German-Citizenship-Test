import questionData from '../data/all.json';
import Question from '../components/Question/Question';
import { Container, Divider } from '@mui/material';
import React from 'react';
import { usePageMeta } from '../hooks/pageTitle';

const AllQuestionsRoute: React.FC = () => {
  usePageMeta({
    title: 'Alle Fragen | Einbürgerungstest',
    description: 'Durchsuchen Sie alle 300 Fragen, die im deutschen Einbürgerungstest vorkommen können. Perfekte Vorbereitung für die Prüfung.',
  });

  return (
    <>
      {questionData.map((question) => (
        <React.Fragment key={question.id}>
          <Question
            question={question}
          />
          <Container maxWidth="md">
            <Divider sx={{ marginY: 10 }} />
          </Container>
        </React.Fragment>
      ))}
    </>
  );
};

export default AllQuestionsRoute;
