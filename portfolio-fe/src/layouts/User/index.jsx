import Footer from "./Footer";
import Header from "./Header";

function UserLayout({ children }) {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
export default UserLayout;
