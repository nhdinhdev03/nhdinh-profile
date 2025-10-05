import CommunityTestimonials from "./CommunityTestimonials";

/**
 * Examples of how to use CommunityTestimonials with different optimized titles
 */

// 1. DEFAULT USAGE - Automatically selects best title
export const DefaultTestimonials = () => <CommunityTestimonials />;

// 2. LANDING PAGE - Focus on impact and results
export const LandingPageTestimonials = () => (
  <CommunityTestimonials
    titleVariant="impact"
    context={{
      pageType: "landing",
      goal: "conversion",
      audience: "business",
    }}
  />
);

// 3. ABOUT PAGE - More personal approach
export const AboutPageTestimonials = () => (
  <CommunityTestimonials
    titleVariant="personal"
    context={{
      pageType: "about",
      audience: "personal",
      goal: "connection",
    }}
  />
);

// 4. CORPORATE/ENTERPRISE FOCUSED
export const CorporateTestimonials = () => (
  <CommunityTestimonials
    titleVariant="trust"
    context={{
      industry: "enterprise",
      audience: "corporate",
      goal: "credibility",
    }}
  />
);

// 5. COMMUNITY/BLOG FOCUSED
export const CommunityTestimonials = () => (
  <CommunityTestImonials
    titleVariant="community"
    context={{
      pageType: "blog",
      audience: "developers",
      goal: "community",
    }}
  />
);

// 6. BUSINESS/SALES FOCUSED
export const BusinessTestimonials = () => (
  <CommunityTestimonials
    titleVariant="business"
    context={{
      pageType: "services",
      audience: "business",
      goal: "sales",
    }}
  />
);

/**
 * A/B Testing Component - Randomly shows different variants
 */
export const ABTestTestimonials = () => {
  const variants = ["professional", "impact", "trust", "business"];
  const randomVariant = variants[Math.floor(Math.random() * variants.length)];

  return (
    <CommunityTestimonials
      titleVariant={randomVariant}
      context={{
        pageType: "experiment",
        audience: "mixed",
        goal: "optimization",
      }}
    />
  );
};

/**
 * Dynamic Context-Aware Component
 */
export const SmartTestimonials = ({ userType, currentPage, businessGoal }) => {
  const context = {
    pageType: currentPage,
    audience: userType,
    goal: businessGoal,
    industry: "tech", // Could be dynamic too
  };

  return <CommunityTestimonials context={context} />;
};

// Usage Examples:
/*
// In Homepage
<DefaultTestimonials />

// In Landing Page  
<LandingPageTestimonials />

// In About Page
<AboutPageTestimonials />

// Corporate Site
<CorporateTestimonials />

// Dynamic based on user
<SmartTestimonials 
  userType="enterprise" 
  currentPage="homepage" 
  businessGoal="conversion" 
/>

// A/B Testing
<ABTestTestimonials />
*/

export default {
  DefaultTestimonials,
  LandingPageTestimonials,
  AboutPageTestimonials,
  CorporateTestimonials,
  CommunityTestimonials,
  BusinessTestimonials,
  ABTestTestimonials,
  SmartTestimonials,
};
