import { type RouteConfig, route } from "@react-router/dev/routes";

export default [
  route("/login", "./components/Login.tsx"),
  route("/signup", "./components/Signup.tsx"),
  route("/lists", "./components/Lists.tsx"),
  route("/stats", "./components/Stats.tsx"),
  // pattern ^           ^ module file
] satisfies RouteConfig;
