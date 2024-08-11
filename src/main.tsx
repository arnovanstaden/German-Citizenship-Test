import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Root from "./routes/root";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './error-page';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
