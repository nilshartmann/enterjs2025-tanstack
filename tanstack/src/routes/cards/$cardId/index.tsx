import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/cards/$cardId/")({
  component: RouteComponent,
});

function RouteComponent() {
  const cardId = Route.useParams().cardId;
  return <div>Hello Card {cardId}</div>;
}
