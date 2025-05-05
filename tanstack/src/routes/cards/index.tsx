import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchCardListOpts } from "@/queries.ts";
import CardList from "@/components/CardList.tsx";

export const Route = createFileRoute("/cards/")({
  component: RouteComponent,

  loader({ context }) {
    context.queryClient.ensureQueryData(fetchCardListOpts());
  },
});

function RouteComponent() {
  const { data: cards } = useSuspenseQuery(fetchCardListOpts());
  return (
    <div
      className={
        "container mx-auto flex flex-col items-center justify-center space-y-8"
      }
    >
      <h1>Select your favourite greeting card</h1>
      <CardList cards={cards} />
    </div>
  );
}
