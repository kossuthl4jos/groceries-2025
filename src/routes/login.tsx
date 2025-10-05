import { createFileRoute } from "@tanstack/react-router";
import { Login } from "./Login/Login";

export const Route = createFileRoute("/login")({
  component: LoginRoute,
});

function LoginRoute() {
  return <Login />;
}
