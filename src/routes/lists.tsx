import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/lists")({
  component: Lists,
});

function Lists() {
  return (
    <div className="p-2">
      <h3>Welcome to the Lists Page!</h3>
    </div>
  );
}
