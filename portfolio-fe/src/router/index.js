import { AdminLayout, UserLayout } from "layouts";
import * as PageAdmin from "pages/Admin";
import * as PageUser from "pages/User";
import { ROUTES } from "./routeConstants";


// Mẹo: luôn dùng ROUTES.* để không hard-code chuỗi
export const publicRoutes = [
  { path: ROUTES.HOME, component: PageUser.HomeIndex, layout: UserLayout },
  { path: ROUTES.ABOUT, component: PageUser.About, layout: UserLayout },
  { path: ROUTES.BLOG, component: PageUser.Blog, layout: UserLayout },
  { path: ROUTES.CONTACT, component: PageUser.Contact, layout: UserLayout },
  { path: ROUTES.PROJECTS, component: PageUser.Projects, layout: UserLayout },
  // { path: ROUTES.LOGIN, component: PageUser.Login, layout: UserLayout },
];

export const privateRoutes = [
  // {
  //   path: ROUTES.ADMIN.PORTAL,
  //   component: PageAdmin.AdminIndex,
  //   layout: AdminLayout,
  // },
];
