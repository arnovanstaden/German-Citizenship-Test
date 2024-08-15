import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Layout from "./routes/layout";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './error-page';
import './global.css';
import AllQuestionsRoute from './routes/all';
import BookmarkedRoute from './routes/bookmarked';
import WrongRoute from './routes/wrong';
import IndexRoute from './routes';
import QuizQuestionsRoute from './routes/quiz/questions';
import QuizIndexRoute from './routes/quiz';
import QuizScoreRoute from './routes/quiz/score';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <IndexRoute /> },
      {
        path: "quiz",
        element: <QuizIndexRoute />,
      },
      {
        path: "quiz/:id",
        element: <QuizQuestionsRoute />,
      },
      {
        path: "quiz/score",
        element: <QuizScoreRoute />,
      },
      {
        path: "all",
        element: <AllQuestionsRoute />,
      },
      {
        path: "bookmarked",
        element: <BookmarkedRoute />,
      },
      {
        path: "wrong",
        element: <WrongRoute />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
