import CommunityTestimonials from "./CommunityTestimonials";

/**
 * Demo component để test CommunityTestimonials với tất cả tính năng mới
 */
const TestimonialsDemo = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "2rem 0",
      }}
    >
      <CommunityTestimonials />
    </div>
  );
};

export default TestimonialsDemo;
