import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Layout from './routes/layout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './global.css';
import AllQuestionsRoute from './routes/all';
import BookmarkedRoute from './routes/bookmarked';
import WrongRoute from './routes/wrong';
import IndexRoute from './routes';
import QuizQuestionsRoute from './routes/quiz/questions';
import QuizIndexRoute from './routes/quiz';
import QuizScoreRoute from './routes/quiz/score';
import AllAnswersRoute from './routes/answers';
import StateIndexRoute from './routes/states';
import SpecificStateRoute from './routes/states/state';
import Error404 from './components/Error404/Error404';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <IndexRoute /> },
      {
        path: 'quiz',
        element: <QuizIndexRoute />,
      },
      {
        path: 'quiz/:id',
        element: <QuizQuestionsRoute />,
      },
      {
        path: 'quiz/score',
        element: <QuizScoreRoute />,
      },
      {
        path: 'all',
        element: <AllQuestionsRoute />,
      },
      {
        path: 'states',
        element: <StateIndexRoute />,
      },
      {
        path: 'states/:state',
        element: <SpecificStateRoute />,
      },
      {
        path: 'answers',
        element: <AllAnswersRoute />,
      },
      {
        path: 'bookmarked',
        element: <BookmarkedRoute />,
      },
      {
        path: 'wrong',
        element: <WrongRoute />,
      },
      {
        path: '*',
        element: <Error404 />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
