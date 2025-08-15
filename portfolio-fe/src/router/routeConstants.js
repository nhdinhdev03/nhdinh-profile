export const API_VERSION = "nhdinh";
export const ADMIN_PREFIX = "/admin"; // luôn có /

export const AUTH_LOGIN = "/auth/login"; // luôn có /

export const ROUTES = {
  //user
  HOME: `/`,
  ABOUT: `/${API_VERSION}/about`,
  BLOG: `/${API_VERSION}/blog`,
  CONTACT: `/${API_VERSION}/contact`,
  PROJECTS: `/${API_VERSION}/projects`,

  //login
  LOGIN: `/${AUTH_LOGIN}/login`,

  //admin
  ADMIN: {
    LOGIN: `${ADMIN_PREFIX}/login`,
    DASHBOARD: `${ADMIN_PREFIX}/dashboard`,
    HOME_MANAGEMENT: `${ADMIN_PREFIX}/home`,
    ABOUT_MANAGEMENT: `${ADMIN_PREFIX}/about`,
    PROJECTS_MANAGEMENT: `${ADMIN_PREFIX}/projects`,
    BLOG_MANAGEMENT: `${ADMIN_PREFIX}/blog`,
    CONTACT_MANAGEMENT: `${ADMIN_PREFIX}/contact`,
    ACCOUNTS_MANAGEMENT: `${ADMIN_PREFIX}/accounts`,
    HISTORY_LOGS: `${ADMIN_PREFIX}/history`,
    SETTINGS: `${ADMIN_PREFIX}/settings`,
    PROFILE: `${ADMIN_PREFIX}/profile`,
    MEDIA_LIBRARY: `${ADMIN_PREFIX}/media`,
    ANALYTICS: `${ADMIN_PREFIX}/analytics`,
    PORTAL: `${ADMIN_PREFIX}/portal`,
  },
};
