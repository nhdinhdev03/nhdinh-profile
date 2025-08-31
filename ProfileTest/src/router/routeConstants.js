export const API_VERSION = "profile";
export const ADMIN_PREFIX = "/admin"; // luôn có /

// Đường dẫn login riêng biệt
export const AUTH_LOGIN = "/auth/login"; // luôn có /

export const ROUTES = {
  // User routes
  HOME: `/`,
  ABOUT: `/about`,
  BLOG: `/blog`,
  CONTACT: `/contact`,
  PROJECTS: `/projects`,
  SETTINGS: `/settings`,
  //
  SKILLS: `/skills`,
  PRIVACY: `/privacy`,
  TERMS: `/terms`,
  
  ADMIN: {
    // Dashboard
    DASHBOARD: `${ADMIN_PREFIX}/dashboard`,

    // 1. Quản lý Trang chủ / Hero
    HERO_MANAGEMENT: `${ADMIN_PREFIX}/hero`,

    // 2. Quản lý Dự án (Projects)
    PROJECTS_MANAGEMENT: `${ADMIN_PREFIX}/projects`,
    PROJECT_CATEGORIES_MANAGEMENT: `${ADMIN_PREFIX}/projects/categories`,
    PROJECT_TAGS_MANAGEMENT: `${ADMIN_PREFIX}/projects/tags`,

    // 3. Quản lý Blog
    BLOG_POSTS_MANAGEMENT: `${ADMIN_PREFIX}/blog/posts`,
    BLOG_TAGS_MANAGEMENT: `${ADMIN_PREFIX}/blog/tags`,

    // 4. Quản lý Liên hệ
    CONTACT_MESSAGES_MANAGEMENT: `${ADMIN_PREFIX}/contact/messages`,

    // 5. Quản lý Hồ sơ cá nhân (Profile)
    PROFILE_INFO_MANAGEMENT: `${ADMIN_PREFIX}/profile/info`,
    EXPERIENCE_MANAGEMENT: `${ADMIN_PREFIX}/profile/experience`,

    // 6. Quản lý Kỹ năng (Skills)
    SKILL_CATEGORIES_MANAGEMENT: `${ADMIN_PREFIX}/skills/categories`,
    SKILLS_MANAGEMENT: `${ADMIN_PREFIX}/skills`,

    // 7. Quản lý Tài khoản Admin
    ACCOUNT_MANAGEMENT: `${ADMIN_PREFIX}/account`,
    SETTINGS: `${ADMIN_PREFIX}/settings`,

    // 8. Quản lý Media
    MEDIA_MANAGEMENT: `${ADMIN_PREFIX}/media`,

    // 9. Analytics
    ANALYTICS: `${ADMIN_PREFIX}/analytics`,
  },
};
