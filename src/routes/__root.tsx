import { Header, Navbar } from "@/components";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

const RootLayout = () => (
  <>
    <Header />
    <div className="container mx-auto px-4 pb-20">
      <Outlet />
    </div>
    <Navbar />
    <TanStackRouterDevtools />
  </>
);

export const Route = createRootRoute({ component: RootLayout });
