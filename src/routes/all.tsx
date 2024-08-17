import questionData from '../data/all.json';
import Question from '../components/Question/Question';
import { Container, Divider } from '@mui/material';
import React from 'react';

const AllQuestionsRoute: React.FC = () => {
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
