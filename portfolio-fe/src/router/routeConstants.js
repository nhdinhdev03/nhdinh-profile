export const API_VERSION = "nhdinh/siuuuuuuuuu";
export const ADMIN_PREFIX = "/admin/siuuuuuuuuuuu"; // luôn có /

// Đường dẫn login riêng biệt
export const AUTH_LOGIN = "/nhdinh/auth/login"; // luôn có /

export const ROUTES = {
  // User routes
  HOME: `/`,
  ABOUT: `/${API_VERSION}/about`,
  BLOG: `/${API_VERSION}/blog`,
  CONTACT: `/${API_VERSION}/contact`,
  PROJECTS: `/${API_VERSION}/projects`,
  
  ADMIN: {
    // Dashboard
    DASHBOARD: `${ADMIN_PREFIX}/dashboard`,

    // 1. Quản lý Trang chủ / Hero
    HERO_MANAGEMENT: `${ADMIN_PREFIX}/hero`,
    HERO_SUBHEADING_MANAGEMENT: `${ADMIN_PREFIX}/hero/subheading`,

    // 2. Quản lý Dự án (Projects)
    PROJECTS_MANAGEMENT: `${ADMIN_PREFIX}/projects`,
    PROJECT_CATEGORIES_MANAGEMENT: `${ADMIN_PREFIX}/projects/categories`,
    PROJECT_TAGS_MANAGEMENT: `${ADMIN_PREFIX}/projects/tags`,
    PROJECT_TAG_MAP_MANAGEMENT: `${ADMIN_PREFIX}/projects/tag-mapping`,

    // 3. Quản lý Blog
    BLOG_POSTS_MANAGEMENT: `${ADMIN_PREFIX}/blog/posts`,
    BLOG_TAGS_MANAGEMENT: `${ADMIN_PREFIX}/blog/tags`,
    BLOG_TAG_MAP_MANAGEMENT: `${ADMIN_PREFIX}/blog/tag-mapping`,

    // 4. Quản lý Liên hệ
    CONTACT_MESSAGES_MANAGEMENT: `${ADMIN_PREFIX}/contact/messages`,

    // 5. Quản lý Hồ sơ cá nhân (Profile)
    PROFILE_INFO_MANAGEMENT: `${ADMIN_PREFIX}/profile/info`,
    PROFILE_TAGS_MANAGEMENT: `${ADMIN_PREFIX}/profile/tags`,
    EXPERIENCE_MANAGEMENT: `${ADMIN_PREFIX}/profile/experience`,

    // 6. Quản lý Kỹ năng (Skills)
    SKILL_CATEGORIES_MANAGEMENT: `${ADMIN_PREFIX}/skills/categories`,
    SKILLS_MANAGEMENT: `${ADMIN_PREFIX}/skills`,

    // 7. Quản lý Tài khoản Admin
    ADMIN_USERS_MANAGEMENT: `${ADMIN_PREFIX}/admin-users`,

    // 8. Các chức năng bổ sung cho Admin
    ANALYTICS: `${ADMIN_PREFIX}/analytics`,
    HISTORY_LOGS: `${ADMIN_PREFIX}/history`,
    MEDIA_LIBRARY: `${ADMIN_PREFIX}/media`,
    SETTINGS: `${ADMIN_PREFIX}/settings`,
    PROFILE: `${ADMIN_PREFIX}/admin-profile`,
  },
};
