import { AdminLayout, UserLayout } from "layouts";
import * as PageAdmin from "pages/Admin";
import * as PageUser from "pages/User";


export const API_VERSION = "v1";
export const ADMIN_PREFIX = "/dashboard-management-sys";

export const publicRoutes = [
  { path: "/", component: PageUser.HomeIndex, layout: UserLayout },
  { path: "/aboutssss", component: PageUser.About, layout: UserLayout },

// { path: `/${API_VERSION}/shop/products`, component: PageUser.Products, layout: UserLayout },
];

export const privateRoutes = [
  { path: `${ADMIN_PREFIX}/portal`, component: PageAdmin.AdminIndex, layout: AdminLayout },
];

