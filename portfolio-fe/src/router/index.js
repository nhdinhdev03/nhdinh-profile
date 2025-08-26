
// ===== router/index.js =====
import { AdminLayout, UserLayout } from "layouts";
import * as PageAdmin from "pages/Admin";
import * as PageUser from "pages/User";
import * as AuthComponents from "components/Auth";
import { AUTH_LOGIN, ROUTES } from "./routeConstants";



// Mẹo: luôn dùng ROUTES.* để không hard-code chuỗi
export const publicRoutes = [
  { path: ROUTES.HOME, component: PageUser.HomeIndex, layout: UserLayout },
  { path: ROUTES.ABOUT, component: PageUser.About, layout: UserLayout },
  { path: ROUTES.BLOG, component: PageUser.Blog, layout: UserLayout },
  { path: ROUTES.CONTACT, component: PageUser.Contact, layout: UserLayout },
  { path: ROUTES.PROJECTS, component: PageUser.Projects, layout: UserLayout },


];

export const privateRoutes = [
  // Auth
  {
    path: AUTH_LOGIN,
    component: AuthComponents.LoginForm,
  },
  
  // Dashboard
  {
    path: ROUTES.ADMIN.DASHBOARD,
    component: PageAdmin.AdminDashboard,
    layout: AdminLayout,
  },

  // Home Module Management
  {
    path: ROUTES.ADMIN.HOME_MANAGEMENT,
    component: PageAdmin.HomeManagement,
    layout: AdminLayout,
  },
  {
    path: ROUTES.ADMIN.HERO_MANAGEMENT,
    component: PageAdmin.HeroManagement,
    layout: AdminLayout,
  },
  {
    path: ROUTES.ADMIN.HERO_SUBHEADING_MANAGEMENT,
    component: PageAdmin.HeroSubHeadingManagement,
    layout: AdminLayout,
  },

  // About/Profile Module Management
  {
    path: ROUTES.ADMIN.ABOUT_MANAGEMENT,
    component: PageAdmin.AboutManagement,
    layout: AdminLayout,
  },
  {
    path: ROUTES.ADMIN.PROFILE_INFO_MANAGEMENT,
    component: PageAdmin.ProfileInfoManagement,
    layout: AdminLayout,
  },
  {
    path: ROUTES.ADMIN.PROFILE_TAGS_MANAGEMENT,
    component: PageAdmin.ProfileTagsManagement,
    layout: AdminLayout,
  },
  {
    path: ROUTES.ADMIN.EXPERIENCE_MANAGEMENT,
    component: PageAdmin.ExperienceManagement,
    layout: AdminLayout,
  },
  {
    path: ROUTES.ADMIN.SKILLS_MANAGEMENT,
    component: PageAdmin.SkillsManagement,
    layout: AdminLayout,
  },
  {
    path: ROUTES.ADMIN.SKILL_CATEGORIES_MANAGEMENT,
    component: PageAdmin.SkillCategoriesManagement,
    layout: AdminLayout,
  },

  // Projects Module Management
  {
    path: ROUTES.ADMIN.PROJECTS_MANAGEMENT,
    component: PageAdmin.ProjectsManagement,
    layout: AdminLayout,
  },
  {
    path: ROUTES.ADMIN.PROJECT_CATEGORIES_MANAGEMENT,
    component: PageAdmin.ProjectCategoriesManagement,
    layout: AdminLayout,
  },
  {
    path: ROUTES.ADMIN.PROJECT_TAGS_MANAGEMENT,
    component: PageAdmin.ProjectTagsManagement,
    layout: AdminLayout,
  },
  {
    path: ROUTES.ADMIN.PROJECT_TAG_MAP_MANAGEMENT,
    component: PageAdmin.ProjectTagMapManagement,
    layout: AdminLayout,
  },

  // Blog Module Management
  {
    path: ROUTES.ADMIN.BLOG_MANAGEMENT,
    component: PageAdmin.BlogManagement,
    layout: AdminLayout,
  },
  {
    path: ROUTES.ADMIN.BLOG_POSTS_MANAGEMENT,
    component: PageAdmin.BlogPostsManagement,
    layout: AdminLayout,
  },
  {
    path: ROUTES.ADMIN.BLOG_TAGS_MANAGEMENT,
    component: PageAdmin.BlogTagsManagement,
    layout: AdminLayout,
  },
  {
    path: ROUTES.ADMIN.BLOG_TAG_MAP_MANAGEMENT,
    component: PageAdmin.BlogTagMapManagement,
    layout: AdminLayout,
  },

  // Contact Module Management
  {
    path: ROUTES.ADMIN.CONTACT_MANAGEMENT,
    component: PageAdmin.ContactManagement,
    layout: AdminLayout,
  },
  {
    path: ROUTES.ADMIN.CONTACT_MESSAGES_MANAGEMENT,
    component: PageAdmin.ContactMessagesManagement,
    layout: AdminLayout,
  },

  // System Management
  {
    path: ROUTES.ADMIN.ADMIN_USERS_MANAGEMENT,
    component: PageAdmin.AdminUsersManagement,
    layout: AdminLayout,
  },
  {
    path: ROUTES.ADMIN.HISTORY_LOGS,
    component: PageAdmin.HistoryLogs,
    layout: AdminLayout,
  },
  {
    path: ROUTES.ADMIN.MEDIA_LIBRARY,
    component: PageAdmin.MediaLibrary,
    layout: AdminLayout,
  },
  {
    path: ROUTES.ADMIN.ANALYTICS,
    component: PageAdmin.Analytics,
    layout: AdminLayout,
  },
  {
    path: ROUTES.ADMIN.SETTINGS,
    component: PageAdmin.Settings,
    layout: AdminLayout,
  },
  {
    path: ROUTES.ADMIN.PROFILE,
    component: PageAdmin.Profile,
    layout: AdminLayout,
  },

 
];
