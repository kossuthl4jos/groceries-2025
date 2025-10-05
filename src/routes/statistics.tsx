import { createFileRoute } from "@tanstack/react-router";
import { Statistics } from "./Statistics/Statistics";

export const Route = createFileRoute("/statistics")({
  component: StatsRoute,
});

function StatsRoute() {
  return <Statistics />;
}
