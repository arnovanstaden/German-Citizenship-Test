import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Root from "./routes/layout";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './error-page';
import './global.css';
import QuestionRoute from './routes/question';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "questions/:id",
        element: <QuestionRoute />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
