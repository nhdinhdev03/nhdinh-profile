import { About, Blog, HomeIndex, Projects ,Contact } from "pages/User";
import Footer from "./Footer";
import Header from "./Header";


function UserLayout() {
  return (
    <div>
      <Header />
      <HomeIndex />;
      <Projects />
      <Blog />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}
export default UserLayout;
