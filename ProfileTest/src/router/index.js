// ===== router/index.js (optimized with code-splitting) =====
import React from "react";
import Layout from "../Layout";
import { ROUTES } from "./routeConstants";
import * as PageUser from "../pages";

// Lazy-loaded Settings page
const Settings = React.lazy(() => import("../pages/Settings/Settings"));

// Mẹo: luôn dùng ROUTES.* để không hard-code chuỗi
export const publicRoutes = [
  { path: ROUTES.HOME, component: PageUser.Home, layout: Layout },
  { path: ROUTES.ABOUT, component: PageUser.About, layout: Layout },
  { path: ROUTES.BLOG, component: PageUser.Blog, layout: Layout },
  { path: ROUTES.CONTACT, component: PageUser.Contact, layout: Layout },
  { path: ROUTES.PROJECTS, component: PageUser.Projects, layout: Layout },
  { path: ROUTES.SETTINGS, component: Settings, layout: Layout },
  { path: "*", component: PageUser.NotFound, layout: Layout }, // Catch-all route for 404
];

export const privateRoutes = [
  // Auth routes sẽ được thêm sau khi có authentication system
  // Ví dụ:
  // {
  //   path: AUTH_LOGIN,
  //   component: LoginForm,
  // },
  
  // Admin routes sẽ được thêm sau khi có admin layout và components
  // Ví dụ:
  // {
  //   path: ROUTES.ADMIN.DASHBOARD,
  //   component: AdminDashboard,
  //   layout: AdminLayout,
  // },
];