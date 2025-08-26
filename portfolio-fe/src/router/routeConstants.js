export const API_VERSION = "nhdinh/siuuuuuuuuu";
export const ADMIN_PREFIX = "/admin/siuuuuuuuuuuu"; // luôn có /


// Đường dẫn login riêng biệt
export const AUTH_LOGIN = "/nhdinh/auth/login"; // luôn có /

export const ROUTES = {
  //user
  HOME: `/`,
  ABOUT: `/${API_VERSION}/about`,
  BLOG: `/${API_VERSION}/blog`,
  CONTACT: `/${API_VERSION}/contact`,
  PROJECTS: `/${API_VERSION}/projects`,
  

  ADMIN: {
    // Dashboard
    DASHBOARD: `${ADMIN_PREFIX}/dashboard`,

    // Home Module
    HOME_MANAGEMENT: `${ADMIN_PREFIX}/home`,
    HERO_MANAGEMENT: `${ADMIN_PREFIX}/home/hero`,
    HERO_SUBHEADING_MANAGEMENT: `${ADMIN_PREFIX}/home/hero-subheading`,

    // About/Profile Module
    ABOUT_MANAGEMENT: `${ADMIN_PREFIX}/about`,
    PROFILE_INFO_MANAGEMENT: `${ADMIN_PREFIX}/about/profile`,
    PROFILE_TAGS_MANAGEMENT: `${ADMIN_PREFIX}/about/profile-tags`,
    EXPERIENCE_MANAGEMENT: `${ADMIN_PREFIX}/about/experience`,
    SKILLS_MANAGEMENT: `${ADMIN_PREFIX}/about/skills`,
    SKILL_CATEGORIES_MANAGEMENT: `${ADMIN_PREFIX}/about/skill-categories`,

    // Projects Module
    PROJECTS_MANAGEMENT: `${ADMIN_PREFIX}/projects`,
    PROJECT_CATEGORIES_MANAGEMENT: `${ADMIN_PREFIX}/projects/categories`,
    PROJECT_TAGS_MANAGEMENT: `${ADMIN_PREFIX}/projects/tags`,
    PROJECT_TAG_MAP_MANAGEMENT: `${ADMIN_PREFIX}/projects/tag-mapping`,

    // Blog Module
    BLOG_MANAGEMENT: `${ADMIN_PREFIX}/blog`,
    BLOG_POSTS_MANAGEMENT: `${ADMIN_PREFIX}/blog/posts`,
    BLOG_TAGS_MANAGEMENT: `${ADMIN_PREFIX}/blog/tags`,
    BLOG_TAG_MAP_MANAGEMENT: `${ADMIN_PREFIX}/blog/tag-mapping`,

    // Contact Module
    CONTACT_MANAGEMENT: `${ADMIN_PREFIX}/contact`,
    CONTACT_MESSAGES_MANAGEMENT: `${ADMIN_PREFIX}/contact/messages`,

    // System Management
    ACCOUNTS_MANAGEMENT: `${ADMIN_PREFIX}/accounts`,
    ADMIN_USERS_MANAGEMENT: `${ADMIN_PREFIX}/accounts/admin-users`,
    HISTORY_LOGS: `${ADMIN_PREFIX}/history`,
    SETTINGS: `${ADMIN_PREFIX}/settings`,
    PROFILE: `${ADMIN_PREFIX}/profile`,
    MEDIA_LIBRARY: `${ADMIN_PREFIX}/media`,
    ANALYTICS: `${ADMIN_PREFIX}/analytics`,
    PORTAL: `${ADMIN_PREFIX}/portal`,
  },
};
