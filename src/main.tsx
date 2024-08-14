import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Root from "./routes/layout";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './error-page';
import './global.css';
import QuizRoute from './routes/quiz';
import AllQuestionsRoute from './routes/all';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "quiz/:id",
        element: <QuizRoute />,
      },
      {
        path: "all",
        element: <AllQuestionsRoute />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
