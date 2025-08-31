import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '../Layout';
import Home from '../pages/User/Home';
import About from '../pages/User/About';
import Projects from '../pages/User/Projects';
import Blog from '../pages/User/Blog';
import Contact from '../pages/User/Contact';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'about',
        element: <About />
      },
      {
        path: 'projects',
        element: <Projects />
      },
      {
        path: 'blog',
        element: <Blog />
      },
      {
        path: 'contact',
        element: <Contact />
      }
    ]
  }
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}