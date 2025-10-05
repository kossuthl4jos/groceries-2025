import { createFileRoute } from "@tanstack/react-router";
import { Lists } from "./Lists/Lists";

export const Route = createFileRoute("/")({
  component: ListsRoute,
});

function ListsRoute() {
  return <Lists />;
}
