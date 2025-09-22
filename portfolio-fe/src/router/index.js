import { lazy } from "react";
import { ROUTES, ROUTE_METADATA } from "router/routeConstants";

// Lazy loading components
const About = lazy(() => import("page/About/About"));
const Skills = lazy(() => import("page/Skills/Skills"));
const Projects = lazy(() => import("page/Projects/Projects"));
const Blog = lazy(() => import("page/Blog/Blog"));
const BlogDetail = lazy(() => import("page/Blog/BlogDetail"));
const Contact = lazy(() => import("page/Contact/Contact"));
const Hero = lazy(() => import("page/Hero/Hero"));


// Lazy loading admin components
const AdminDashboard = lazy(() => import("page/Admin/Dashboard/Dashboard"));

// Hero management
const HeroManagement = lazy(() => import("page/Admin/Hero/HeroManagement"));
const HeroTranslations = lazy(() => import("page/Admin/Hero/HeroTranslations"));
const HeroSubheadings = lazy(() => import("page/Admin/Hero/HeroSubheadings"));

// Project management
const ProjectManagement = lazy(() => import("page/Admin/Projects/ProjectManagement"));
const ProjectCategories = lazy(() => import("page/Admin/Projects/ProjectCategories"));
const ProjectTags = lazy(() => import("page/Admin/Projects/ProjectTags"));
const ProjectTranslations = lazy(() => import("page/Admin/Projects/ProjectTranslations"));

// Blog management
const BlogManagement = lazy(() => import("page/Admin/Blog/BlogManagement"));
const BlogPosts = lazy(() => import("page/Admin/Blog/BlogPosts"));
const BlogTags = lazy(() => import("page/Admin/Blog/BlogTags"));
const BlogTranslations = lazy(() => import("page/Admin/Blog/BlogTranslations"));

// Contact management
const ContactManagement = lazy(() => import("page/Admin/Contact/ContactManagement"));
const ContactMessages = lazy(() => import("page/Admin/Contact/ContactMessages"));

// Profile management
const ProfileManagement = lazy(() => import("page/Admin/Profile/ProfileManagement"));
const ProfileInfo = lazy(() => import("page/Admin/Profile/ProfileInfo"));
const ProfileExperience = lazy(() => import("page/Admin/Profile/ProfileExperience"));

// Skills management
const SkillsManagement = lazy(() => import("page/Admin/Skills/SkillsManagement"));
const SkillCategories = lazy(() => import("page/Admin/Skills/SkillCategories"));

// Admin users
const AdminUsers = lazy(() => import("page/Admin/Users/AdminUsers"));


export const publicRoutes = [
  {
    path: ROUTES.HOME,
    component: Hero,
    metadata: ROUTE_METADATA[ROUTES.HOME],
  },
  {
    path: ROUTES.ABOUT,
    component: About,
    metadata: ROUTE_METADATA[ROUTES.ABOUT],
  },
  {
    path: ROUTES.SKILLS,
    component: Skills,
    metadata: ROUTE_METADATA[ROUTES.SKILLS],
  },
  {
    path: ROUTES.PROJECTS,
    component: Projects,
    metadata: ROUTE_METADATA[ROUTES.PROJECTS],
  },
  {
    path: ROUTES.BLOG,
    component: Blog,
    metadata: ROUTE_METADATA[ROUTES.BLOG],
  },
  {
    path: ROUTES.BLOG_DETAIL,
    component: BlogDetail,
    metadata: ROUTE_METADATA[ROUTES.BLOG_DETAIL],
  },
  {
    path: ROUTES.CONTACT,
    component: Contact,
    metadata: ROUTE_METADATA[ROUTES.CONTACT],
  },
];

export const privateRoutes = [
  {
    path: ROUTES.ADMIN_DASHBOARD,
    component: AdminDashboard,
    metadata: ROUTE_METADATA[ROUTES.ADMIN_DASHBOARD],
  },

  // Hero management routes
  {
    path: ROUTES.ADMIN_HERO,
    component: HeroManagement,
    metadata: ROUTE_METADATA[ROUTES.ADMIN_HERO],
  },
  {
    path: ROUTES.ADMIN_HERO_TRANSLATIONS,
    component: HeroTranslations,
    metadata: ROUTE_METADATA[ROUTES.ADMIN_HERO_TRANSLATIONS],
  },
  {
    path: ROUTES.ADMIN_HERO_SUBHEADINGS,
    component: HeroSubheadings,
    metadata: ROUTE_METADATA[ROUTES.ADMIN_HERO_SUBHEADINGS],
  },

  // Project management routes
  {
    path: ROUTES.ADMIN_PROJECTS,
    component: ProjectManagement,
    metadata: ROUTE_METADATA[ROUTES.ADMIN_PROJECTS],
  },
  {
    path: ROUTES.ADMIN_PROJECT_CATEGORIES,
    component: ProjectCategories,
    metadata: ROUTE_METADATA[ROUTES.ADMIN_PROJECT_CATEGORIES],
  },
  {
    path: ROUTES.ADMIN_PROJECT_TAGS,
    component: ProjectTags,
    metadata: ROUTE_METADATA[ROUTES.ADMIN_PROJECT_TAGS],
  },
  {
    path: ROUTES.ADMIN_PROJECT_TRANSLATIONS,
    component: ProjectTranslations,
    metadata: ROUTE_METADATA[ROUTES.ADMIN_PROJECT_TRANSLATIONS],
  },

  // Blog management routes
  {
    path: ROUTES.ADMIN_BLOG,
    component: BlogManagement,
    metadata: ROUTE_METADATA[ROUTES.ADMIN_BLOG],
  },
  {
    path: ROUTES.ADMIN_BLOG_POSTS,
    component: BlogPosts,
    metadata: ROUTE_METADATA[ROUTES.ADMIN_BLOG_POSTS],
  },
  {
    path: ROUTES.ADMIN_BLOG_TAGS,
    component: BlogTags,
    metadata: ROUTE_METADATA[ROUTES.ADMIN_BLOG_TAGS],
  },
  {
    path: ROUTES.ADMIN_BLOG_TRANSLATIONS,
    component: BlogTranslations,
    metadata: ROUTE_METADATA[ROUTES.ADMIN_BLOG_TRANSLATIONS],
  },

  // Contact management routes
  {
    path: ROUTES.ADMIN_CONTACT,
    component: ContactManagement,
    metadata: ROUTE_METADATA[ROUTES.ADMIN_CONTACT],
  },
  {
    path: ROUTES.ADMIN_CONTACT_MESSAGES,
    component: ContactMessages,
    metadata: ROUTE_METADATA[ROUTES.ADMIN_CONTACT_MESSAGES],
  },

  // Profile management routes
  {
    path: ROUTES.ADMIN_PROFILE,
    component: ProfileManagement,
    metadata: ROUTE_METADATA[ROUTES.ADMIN_PROFILE],
  },
  {
    path: ROUTES.ADMIN_PROFILE_INFO,
    component: ProfileInfo,
    metadata: ROUTE_METADATA[ROUTES.ADMIN_PROFILE_INFO],
  },
  {
    path: ROUTES.ADMIN_PROFILE_EXPERIENCE,
    component: ProfileExperience,
    metadata: ROUTE_METADATA[ROUTES.ADMIN_PROFILE_EXPERIENCE],
  },

  // Skills management routes
  {
    path: ROUTES.ADMIN_SKILLS,
    component: SkillsManagement,
    metadata: ROUTE_METADATA[ROUTES.ADMIN_SKILLS],
  },
  {
    path: ROUTES.ADMIN_SKILL_CATEGORIES,
    component: SkillCategories,
    metadata: ROUTE_METADATA[ROUTES.ADMIN_SKILL_CATEGORIES],
  },

  // Admin users routes
  {
    path: ROUTES.ADMIN_USERS,
    component: AdminUsers,
    metadata: ROUTE_METADATA[ROUTES.ADMIN_USERS],
  },
];
