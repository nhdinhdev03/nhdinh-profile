import CommunityTestimonials from "./CommunityTestimonials";

/**
 * Demo showcasing the new subtitle badge UI
 * Similar to Experience component styling
 */
const TestimonialsUIDemo = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
        padding: "2rem 0",
      }}
    >
      {/* Professional Variant */}
      <section style={{ marginBottom: "4rem" }}>
        <h2
          style={{
            textAlign: "center",
            marginBottom: "2rem",
            color: "#1e293b",
          }}
        >
          Professional Variant
        </h2>
        <CommunityTestimonials
          titleVariant="professional"
          context={{
            pageType: "homepage",
            audience: "business",
            goal: "conversion",
          }}
        />
      </section>

      {/* Impact Variant */}
      <section style={{ marginBottom: "4rem" }}>
        <h2
          style={{
            textAlign: "center",
            marginBottom: "2rem",
            color: "#1e293b",
          }}
        >
          Impact Variant
        </h2>
        <CommunityTestimonials
          titleVariant="impact"
          context={{
            pageType: "landing",
            audience: "business",
            goal: "conversion",
          }}
        />
      </section>

      {/* Trust Variant */}
      <section style={{ marginBottom: "4rem" }}>
        <h2
          style={{
            textAlign: "center",
            marginBottom: "2rem",
            color: "#1e293b",
          }}
        >
          Trust Variant
        </h2>
        <CommunityTestimonials
          titleVariant="trust"
          context={{
            pageType: "corporate",
            audience: "enterprise",
            goal: "credibility",
          }}
        />
      </section>

      {/* Community Variant */}
      <section>
        <h2
          style={{
            textAlign: "center",
            marginBottom: "2rem",
            color: "#1e293b",
          }}
        >
          Community Variant
        </h2>
        <CommunityTestimonials
          titleVariant="community"
          context={{
            pageType: "blog",
            audience: "developers",
            goal: "community",
          }}
        />
      </section>
    </div>
  );
};

export default TestimonialsUIDemo;
