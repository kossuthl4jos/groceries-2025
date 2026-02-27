import { Lists } from "@/components/Lists";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: ListsRoute,
});

function ListsRoute() {
  return <Lists />;
}
