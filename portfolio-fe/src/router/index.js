
// ===== router/index.js =====
import { AdminLayout, UserLayout } from "layouts";
import * as PageAdmin from "pages/Admin";
import * as PageUser from "pages/User";
import * as AuthComponents from "components/Auth";
import { ROUTES } from "./routeConstants";

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
    path: ROUTES.ADMIN.LOGIN,
    component: AuthComponents.LoginForm,
  },
  
  // Dashboard
  {
    path: ROUTES.ADMIN.DASHBOARD,
    component: PageAdmin.AdminDashboard,
    layout: AdminLayout,
  },

  // Content Management
  {
    path: ROUTES.ADMIN.HOME_MANAGEMENT,
    component: PageAdmin.HomeManagement,
    layout: AdminLayout,
  },
  {
    path: ROUTES.ADMIN.ABOUT_MANAGEMENT,
    component: PageAdmin.AboutManagement,
    layout: AdminLayout,
  },
  {
    path: ROUTES.ADMIN.PROJECTS_MANAGEMENT,
    component: PageAdmin.ProjectsManagement,
    layout: AdminLayout,
  },
  {
    path: ROUTES.ADMIN.BLOG_MANAGEMENT,
    component: PageAdmin.BlogManagement,
    layout: AdminLayout,
  },
  {
    path: ROUTES.ADMIN.CONTACT_MANAGEMENT,
    component: PageAdmin.ContactManagement,
    layout: AdminLayout,
  },

  // System Management
  {
    path: ROUTES.ADMIN.ACCOUNTS_MANAGEMENT,
    component: PageAdmin.AccountsManagement,
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
