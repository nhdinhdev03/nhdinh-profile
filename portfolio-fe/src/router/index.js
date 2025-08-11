import { AdminLayout, UserLayout } from "layouts";
import * as PageAdmin from "pages/Admin";
import * as PageUser from "pages/User";

export const API_VERSION = "v1";
export const ADMIN_PREFIX = "/dashboard-management-sys";

export const publicRoutes = [
  { path: "/", component: PageUser.HomeIndex, layout: UserLayout },
  { path: "/about", component: PageUser.About, layout: UserLayout },

  { path: "/blog", component: PageUser.Blog, layout: UserLayout },

  { path: "/contact", component: PageUser.Contact, layout: UserLayout },
  { path: "/Project", component: PageUser.Projects, layout: UserLayout },

  // { path: `/${API_VERSION}/shop/products`, component: PageUser.Products, layout: UserLayout },
];

export const privateRoutes = [
  {
    path: `${ADMIN_PREFIX}/portal`,
    component: PageAdmin.AdminIndex,
    layout: AdminLayout,
  },
];
