import questionData from '../data/all.json';
import Question from '../components/Question/Question';
import { Container, Divider } from '@mui/material';
import React from 'react';
import { usePageMeta } from '../hooks/pageTitle';

const AllAnswersRoute: React.FC = () => {
  usePageMeta({
    title: 'Antworten | Einbürgerungstest',
    description: 'Sehen Sie sich ausgewählte Antworten an und üben Sie für den Einbürgerungstest. Perfektionieren Sie Ihr Wissen durch gezielte Übung.',
  });

  return (
    <>
      {questionData.map((question) => (
        <React.Fragment key={question.id}>
          <Question
            question={question}
            withAnswerOnly
          />
          <Container maxWidth="md">
            <Divider sx={{ marginY: 5 }} />
          </Container>
        </React.Fragment>
      ))}
    </>
  );
};

export default AllAnswersRoute;
