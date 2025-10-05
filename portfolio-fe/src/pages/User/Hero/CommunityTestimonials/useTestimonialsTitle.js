import { useMemo } from "react";
import { useTranslation } from "react-i18next";

/**
 * Hook để dynamic select testimonials title dựa trên context
 * @param {string} variant - Type of title: 'professional', 'personal', 'business', 'impact', 'trust', 'community'
 * @param {string} fallback - Fallback title nếu variant không tồn tại
 * @returns {string} Optimized title
 */
export const useTestimonialsTitle = (
  variant = "professional",
  fallback = null
) => {
  const { t } = useTranslation();

  const optimizedTitle = useMemo(() => {
    // Try to get alternative title first
    const alternativeKey = `testimonials.title_alternatives.${variant}`;
    const alternativeTitle = t(alternativeKey, { defaultValue: null });

    // If alternative exists, use it
    if (alternativeTitle && alternativeTitle !== alternativeKey) {
      return alternativeTitle;
    }

    // Fallback to provided fallback or main title
    return fallback || t("testimonials.title");
  }, [t, variant, fallback]);

  return optimizedTitle;
};

/**
 * Hook để get subtitle tương ứng với title variant
 * @param {string} titleVariant - Title variant being used
 * @returns {object} Object containing subtitle and description
 */
export const useTestimonialsContent = (titleVariant = "professional") => {
  const { t } = useTranslation();

  const content = useMemo(() => {
    const baseSubtitle = t("testimonials.subtitle");
    const baseDescription = t("testimonials.description");

    // Try to get localized subtitle first
    const subtitleKey = `testimonials.subtitle_alternatives.${titleVariant}`;
    const localizedSubtitle = t(subtitleKey, { defaultValue: null });

    // Dynamic content based on title variant - clean subtitles like Experience
    const contentMap = {
      professional: {
        subtitle: localizedSubtitle || "Client Success Stories",
        description:
          "Delivering exceptional results for businesses and startups worldwide",
      },
      personal: {
        subtitle: localizedSubtitle || "Community Voices",
        description: baseDescription,
      },
      business: {
        subtitle: localizedSubtitle || "5-Star Reviews",
        description: "Proven track record of successful project deliveries",
      },
      impact: {
        subtitle: localizedSubtitle || "Proven Results",
        description:
          "Projects that drive real business growth and user satisfaction",
      },
      trust: {
        subtitle: localizedSubtitle || "Industry Leaders",
        description: "Endorsed by CTOs, Product Managers, and Tech Leaders",
      },
      community: {
        subtitle: localizedSubtitle || "Developer Community",
        description: "Building lasting relationships through quality work",
      },
    };

    const selectedContent = contentMap[titleVariant] || contentMap.professional;

    return {
      subtitle: selectedContent.subtitle,
      description: t(selectedContent.description, {
        defaultValue: selectedContent.description,
      }),
    };
  }, [t, titleVariant]);

  return content;
};

/**
 * Context-aware title recommendations
 * @param {object} context - Page/section context
 * @returns {string} Recommended title variant
 */
export const getRecommendedTitleVariant = (context = {}) => {
  const {
    pageType = "portfolio",
    industry = "tech",
    audience = "business",
    goal = "conversion",
  } = context;

  // Logic-based recommendations
  if (pageType === "landing" && goal === "conversion") {
    return "impact"; // "Real Results, Real Stories"
  }

  if (audience === "corporate" || industry === "enterprise") {
    return "trust"; // "Trusted by Industry Leaders"
  }

  if (pageType === "about" || audience === "personal") {
    return "personal"; // "What People Say"
  }

  if (goal === "community" || pageType === "blog") {
    return "community"; // "Community Voices"
  }

  // Default professional variant
  return "professional"; // "Client Success Stories"
};

export default {
  useTestimonialsTitle,
  useTestimonialsContent,
  getRecommendedTitleVariant,
};
