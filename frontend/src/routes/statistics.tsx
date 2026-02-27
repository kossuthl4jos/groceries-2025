import { Statistics } from "@/components/Statistics";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/statistics")({
  component: StatsRoute,
});

function StatsRoute() {
  return <Statistics />;
}
