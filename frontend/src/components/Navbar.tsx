import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useRouterState } from "@tanstack/react-router";

export const Navbar = () => {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  return (
    <nav className="bg-gray-800 text-white flex flex-col gap-4 py-6 shadow-[2px_0_5px_rgba(0,0,0,0.2)] min-w-[100px]">
      <Link
        className={`flex flex-col items-center justify-center gap-2 transition-colors py-3 ${
          pathname === "/"
            ? "text-yellow-400"
            : "text-gray-300 hover:text-white"
        }`}
        to="/"
      >
        <FontAwesomeIcon icon={faRightToBracket} size="lg" />
        <span className="text-sm">List</span>
      </Link>

      <Link
        className={`flex flex-col items-center justify-center gap-2 transition-colors py-3 ${
          pathname === "/statistics"
            ? "text-yellow-400"
            : "text-gray-300 hover:text-white"
        }`}
        to="/statistics"
      >
        <FontAwesomeIcon icon={faRightToBracket} size="lg" />
        <span className="text-sm">Stats</span>
      </Link>

      <Link
        className={`flex flex-col items-center justify-center gap-2 transition-colors py-3 ${
          pathname === "/recipies"
            ? "text-yellow-400"
            : "text-gray-300 hover:text-white"
        }`}
        to="/recipies"
      >
        <FontAwesomeIcon icon={faRightToBracket} size="lg" />
        <span className="text-sm">Recipes</span>
      </Link>
    </nav>
  );
};
