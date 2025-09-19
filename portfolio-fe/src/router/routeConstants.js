// File: router/routeConstants.js
export const API_VERSION = "v1";

export const ROUTES = {
  // User routes
  HOME: "/",
  ABOUT: `/${API_VERSION}/about`,
  SKILLS: `/${API_VERSION}/skills`,
  PROJECTS: `/${API_VERSION}/projects`,
  BLOG: `/${API_VERSION}/blog`,
  BLOG_DETAIL: `/${API_VERSION}/blog/:id`,
  CONTACT: `/${API_VERSION}/contact`,
  
  
  // Admin routes

  ADMIN_DASHBOARD: "/admin/dashboard",
  
  // Hero management
  ADMIN_HERO: "/admin/hero",
  ADMIN_HERO_TRANSLATIONS: "/admin/hero/translations",
  ADMIN_HERO_SUBHEADINGS: "/admin/hero/subheadings",
  
  // Project management
  ADMIN_PROJECTS: "/admin/projects",
  ADMIN_PROJECT_CATEGORIES: "/admin/projects/categories",
  ADMIN_PROJECT_TAGS: "/admin/projects/tags",
  ADMIN_PROJECT_TRANSLATIONS: "/admin/projects/translations",
  
  // Blog management
  ADMIN_BLOG: "/admin/blog",
  ADMIN_BLOG_POSTS: "/admin/blog/posts",
  ADMIN_BLOG_TAGS: "/admin/blog/tags",
  ADMIN_BLOG_TRANSLATIONS: "/admin/blog/translations",
  
  // Contact management
  ADMIN_CONTACT: "/admin/contact",
  ADMIN_CONTACT_MESSAGES: "/admin/contact/messages",
  
  // Profile management
  ADMIN_PROFILE: "/admin/profile",
  ADMIN_PROFILE_INFO: "/admin/profile/info",
  ADMIN_PROFILE_EXPERIENCE: "/admin/profile/experience",
  
  // Skills management
  ADMIN_SKILLS: "/admin/skills",
  ADMIN_SKILL_CATEGORIES: "/admin/skills/categories",
  
  // Admin users
  ADMIN_USERS: "/admin/users",
};

// Route metadata for breadcrumb and navigation
export const ROUTE_METADATA = {
  [ROUTES.HOME]: {
    title: 'Home',
    description: 'Welcome to my portfolio',
    showBreadcrumb: false
  },
  [ROUTES.ABOUT]: {
    title: 'About Me',
    description: 'Learn more about my background and journey',
    showBreadcrumb: true
  },
  [ROUTES.SKILLS]: {
    title: 'Skills & Technologies',
    description: 'My technical skills and expertise',
    showBreadcrumb: true
  },
  [ROUTES.PROJECTS]: {
    title: 'Projects',
    description: 'Showcase of my work and projects',
    showBreadcrumb: true
  },
  [ROUTES.BLOG]: {
    title: 'Blog',
    description: 'My thoughts and articles',
    showBreadcrumb: true
  },
  [ROUTES.BLOG_DETAIL]: {
    title: 'Blog Post',
    description: 'Read the full article',
    showBreadcrumb: true
  },
  [ROUTES.CONTACT]: {
    title: 'Contact Me',
    description: 'Get in touch with me',
    showBreadcrumb: true
  },
  
  // Admin route metadata
  [ROUTES.ADMIN]: {
    title: 'Admin',
    description: 'Admin panel',
    showBreadcrumb: false
  },
  [ROUTES.ADMIN_DASHBOARD]: {
    title: 'Dashboard',
    description: 'Admin dashboard overview',
    showBreadcrumb: true
  },
  
  // Hero management
  [ROUTES.ADMIN_HERO]: {
    title: 'Hero Management',
    description: 'Manage hero section',
    showBreadcrumb: true
  },
  [ROUTES.ADMIN_HERO_TRANSLATIONS]: {
    title: 'Hero Translations',
    description: 'Manage hero translations',
    showBreadcrumb: true
  },
  [ROUTES.ADMIN_HERO_SUBHEADINGS]: {
    title: 'Hero Subheadings',
    description: 'Manage hero subheadings',
    showBreadcrumb: true
  },
  
  // Project management
  [ROUTES.ADMIN_PROJECTS]: {
    title: 'Project Management',
    description: 'Manage projects',
    showBreadcrumb: true
  },
  [ROUTES.ADMIN_PROJECT_CATEGORIES]: {
    title: 'Project Categories',
    description: 'Manage project categories',
    showBreadcrumb: true
  },
  [ROUTES.ADMIN_PROJECT_TAGS]: {
    title: 'Project Tags',
    description: 'Manage project tags',
    showBreadcrumb: true
  },
  [ROUTES.ADMIN_PROJECT_TRANSLATIONS]: {
    title: 'Project Translations',
    description: 'Manage project translations',
    showBreadcrumb: true
  },
  
  // Blog management
  [ROUTES.ADMIN_BLOG]: {
    title: 'Blog Management',
    description: 'Manage blog posts',
    showBreadcrumb: true
  },
  [ROUTES.ADMIN_BLOG_POSTS]: {
    title: 'Blog Posts',
    description: 'Manage blog posts',
    showBreadcrumb: true
  },
  [ROUTES.ADMIN_BLOG_TAGS]: {
    title: 'Blog Tags',
    description: 'Manage blog tags',
    showBreadcrumb: true
  },
  [ROUTES.ADMIN_BLOG_TRANSLATIONS]: {
    title: 'Blog Translations',
    description: 'Manage blog translations',
    showBreadcrumb: true
  },
  
  // Contact management
  [ROUTES.ADMIN_CONTACT]: {
    title: 'Contact Management',
    description: 'Manage contact messages',
    showBreadcrumb: true
  },
  [ROUTES.ADMIN_CONTACT_MESSAGES]: {
    title: 'Contact Messages',
    description: 'View and manage contact messages',
    showBreadcrumb: true
  },
  
  // Profile management
  [ROUTES.ADMIN_PROFILE]: {
    title: 'Profile Management',
    description: 'Manage profile information',
    showBreadcrumb: true
  },
  [ROUTES.ADMIN_PROFILE_INFO]: {
    title: 'Profile Info',
    description: 'Manage profile information',
    showBreadcrumb: true
  },
  [ROUTES.ADMIN_PROFILE_EXPERIENCE]: {
    title: 'Experience',
    description: 'Manage work experience',
    showBreadcrumb: true
  },
  
  // Skills management
  [ROUTES.ADMIN_SKILLS]: {
    title: 'Skills Management',
    description: 'Manage skills and categories',
    showBreadcrumb: true
  },
  [ROUTES.ADMIN_SKILL_CATEGORIES]: {
    title: 'Skill Categories',
    description: 'Manage skill categories',
    showBreadcrumb: true
  },
  
  // Admin users
  [ROUTES.ADMIN_USERS]: {
    title: 'Admin Users',
    description: 'Manage admin users',
    showBreadcrumb: true
  },
};