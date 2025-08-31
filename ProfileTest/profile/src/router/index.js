import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '../Layout';

import Home from '../pages/User/Home.jsx';
import About from '../pages/User/About.jsx';
import Projects from '../pages/User/Projects.jsx';
import Blog from '../pages/User/Blog.jsx';
import Contact from '../pages/User/Contact.jsx';

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