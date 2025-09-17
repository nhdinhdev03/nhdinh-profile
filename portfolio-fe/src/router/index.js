import { lazy } from 'react';
import { ROUTES, ROUTE_METADATA } from 'router/routeConstants';

// Lazy loading components
const About = lazy(() => import('Pages/About/About'));
const Skills = lazy(() => import('Pages/Skills/Skills'));
const Projects = lazy(() => import('Pages/Projects/Projects'));
const Blog = lazy(() => import('Pages/Blog/Blog'));
const BlogDetail = lazy(() => import('Pages/Blog/BlogDetail'));
const Contact = lazy(() => import('Pages/Contact/Contact'));
const Hero = lazy(() => import('Pages/Hero/Hero'));

export const publicRoutes = [
  { 
    path: ROUTES.HOME, 
    component: Hero, 
    metadata: ROUTE_METADATA[ROUTES.HOME]
  },
  { 
    path: ROUTES.ABOUT, 
    component: About, 
    metadata: ROUTE_METADATA[ROUTES.ABOUT]
  },
  { 
    path: ROUTES.SKILLS, 
    component: Skills, 
    metadata: ROUTE_METADATA[ROUTES.SKILLS]
  },
  { 
    path: ROUTES.PROJECTS, 
    component: Projects, 
    metadata: ROUTE_METADATA[ROUTES.PROJECTS]
  },
  { 
    path: ROUTES.BLOG, 
    component: Blog, 
    metadata: ROUTE_METADATA[ROUTES.BLOG]
  },
  { 
    path: ROUTES.BLOG_DETAIL, 
    component: BlogDetail, 
    metadata: ROUTE_METADATA[ROUTES.BLOG_DETAIL]
  },
  { 
    path: ROUTES.CONTACT, 
    component: Contact, 
    metadata: ROUTE_METADATA[ROUTES.CONTACT]
  },
];

export const privateRoutes = [
  // Có thể thêm các routes dành riêng cho admin sau này
];