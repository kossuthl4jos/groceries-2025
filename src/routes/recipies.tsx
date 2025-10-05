import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/recipies")({
  component: RecipiesRoute,
});

function RecipiesRoute() {
  return (
    <>
      <h1>Recipes</h1>
    </>
  );
}
