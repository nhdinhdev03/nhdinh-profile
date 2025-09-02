import { Link } from "react-router-dom";
import { ROUTES } from "router/routeConstants";

function Header() {
  return (
    <header>
      <h1>My Portfolio</h1>
      <nav>
        <ul>
          <li><Link to={ROUTES.HOME}>Home</Link></li>
          <li><Link to={ROUTES.ABOUT}>About</Link></li>
          <li><Link to={ROUTES.PROJECTS}>Projects</Link></li>
          <li><Link to={ROUTES.CONTACT}>Contact</Link></li>
          <li><Link to={ROUTES.BLOG}>Blog</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;