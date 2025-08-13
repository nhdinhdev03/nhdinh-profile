export const API_VERSION = "nhdinh";
export const ADMIN_PREFIX = "/dashboard-management-sys"; // luôn có /

export const ROUTES = {
  HOME: `/`,
  ABOUT: `/${API_VERSION}/about`,
  BLOG: `/${API_VERSION}/blog`,
  CONTACT: `/${API_VERSION}/contact`,
  PROJECTS: `/${API_VERSION}/projects`,
  ADMIN: {
    LOGIN: `${ADMIN_PREFIX}/login`,
    PORTAL: `${ADMIN_PREFIX}/portal`,
  },
};
