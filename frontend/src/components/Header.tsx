import { redirect } from "react-router";
import { clearAuthToken, useAuth } from "../context";
import { Link } from "@tanstack/react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightToBracket,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";

export function Header() {
  const { authToken, userName } = useAuth();

  function logOut() {
    if (authToken) {
      clearAuthToken();
      redirect("/login");
    }
  }

  return (
    <div className="bg-sky-900 text-white">
      <nav className=" flex justify-between items-center p-4">
        <h1 className="text-4xl font-bold">
          Groceries {authToken ? ` - Hello ${userName}!` : ""}
        </h1>
        {authToken ? (
          <div className="header-auth-button text-white" onClick={logOut}>
            <FontAwesomeIcon icon={faPowerOff} />
            Log out
          </div>
        ) : (
          <Link className="header-auth-button text-white" to="/login">
            <FontAwesomeIcon icon={faRightToBracket} />
            Log in
          </Link>
        )}
      </nav>
    </div>
  );
}
