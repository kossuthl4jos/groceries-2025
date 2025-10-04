import { redirect } from "react-router";
import { clearAuthToken, useAuth } from "../context";

export function Header() {
  const { authToken, userName } = useAuth();

  function logOut() {
    if (authToken != null) {
      clearAuthToken();
      redirect("/login");
    }
  }

  return (
    <div className="header">
      ex bootstrap Navbar
      {/* <Navbar className="justify-content-between" bg="primary" variant="dark">
        <NavbarBrand>
          Groceries {authToken != null ? ` - Hello ${userName}!` : ""}
        </NavbarBrand>
        {authToken ? (
          <div className="header-auth-button" onClick={logOut}>
            <i className="fas fa-power-off" />
            Log out
          </div>
        ) : (
          <Link className="header-auth-button" to="/login">
            <i className="fas fa-sign-in-alt" />
            Log in
          </Link>
        )}
      </Navbar> */}
    </div>
  );
}
