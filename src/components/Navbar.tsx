import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useRouterState } from "@tanstack/react-router";

export const Navbar = () => {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-800 text-white grid grid-cols-3 items-center text-center py-3 shadow-[0_-2px_5px_rgba(0,0,0,0.2)]">
      <Link
        className={`flex flex-col items-center justify-center gap-1 transition-colors ${
          pathname === "/"
            ? "text-yellow-400"
            : "text-gray-300 hover:text-white"
        }`}
        to="/"
      >
        <FontAwesomeIcon icon={faRightToBracket} />
        <span className="text-sm">List</span>
      </Link>

      <Link
        className={`flex flex-col items-center justify-center gap-1 transition-colors ${
          pathname === "/statistics"
            ? "text-yellow-400"
            : "text-gray-300 hover:text-white"
        }`}
        to="/statistics"
      >
        <FontAwesomeIcon icon={faRightToBracket} />
        <span className="text-sm">Stats</span>
      </Link>

      <Link
        className={`flex flex-col items-center justify-center gap-1 transition-colors ${
          pathname === "/recipies"
            ? "text-yellow-400"
            : "text-gray-300 hover:text-white"
        }`}
        to="/recipies"
      >
        <FontAwesomeIcon icon={faRightToBracket} />
        <span className="text-sm">Recipes</span>
      </Link>
    </div>
  );
};
