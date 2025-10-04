import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

const RootLayout = () => (
  <>
    <div className="p-2 flex gap-2">
      <Link to="/" className="[&.active]:font-bold">
        Home
      </Link>{" "}
      <Link to="/login" className="[&.active]:font-bold">
        Login
      </Link>
      <Link to="/signup" className="[&.active]:font-bold">
        Signup
      </Link>
      <Link to="/lists" className="[&.active]:font-bold">
        Lists
      </Link>
      <Link to="/stats" className="[&.active]:font-bold">
        Stats
      </Link>
    </div>
    <hr />
    <Outlet />
    <TanStackRouterDevtools />
  </>
);

export const Route = createRootRoute({ component: RootLayout });
