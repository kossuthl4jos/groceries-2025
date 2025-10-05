import { createRootRoute, Link, Outlet } from "@tanstack/react-router";

export const Navbar = () => {
  return (
    <div className="navigation-bar">
      <Link
        className={`nav-button ${window.location.pathname === "/lists" ? "active" : ""}`}
        to="/lists"
      >
        <i className="fas fa-list" />
        List
      </Link>
      <Link
        className={`nav-button ${window.location.pathname === "/statistics" ? "active" : ""}`}
        to="/statistics"
      >
        <i className="fas fa-chart-pie" />
        Stats
      </Link>
      <Link className="nav-button" to="/">
        <i className="fas fa-utensils" />
        Recipes
      </Link>
    </div>
  );
};
