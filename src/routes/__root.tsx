import { Header, Navbar } from "@/components";
import { createRootRoute, Outlet } from "@tanstack/react-router";

const RootLayout = () => (
  <div className="flex flex-col h-screen">
    <Header />
    <div className="flex flex-1 overflow-hidden">
      <Navbar />
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto px-4 py-4">
          <Outlet />
        </div>
      </div>
    </div>
    {/* <TanStackRouterDevtools /> */}
  </div>
);

export const Route = createRootRoute({ component: RootLayout });
