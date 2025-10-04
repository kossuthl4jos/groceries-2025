import { NavLink } from "react-router";

export const Navbar = () => {
  return (
    <div className="navigation-bar">
      <NavLink
        className={`nav-button ${window.location.pathname === "/lists" ? "active" : ""}`}
        to="/lists"
      >
        <i className="fas fa-list" />
        List
      </NavLink>
      <NavLink
        className={`nav-button ${window.location.pathname === "/stats" ? "active" : ""}`}
        to="/stats"
      >
        <i className="fas fa-chart-pie" />
        Stats
      </NavLink>
      <NavLink className="nav-button" to="/">
        <i className="fas fa-utensils" />
        Recipes
      </NavLink>
    </div>
  );
};
