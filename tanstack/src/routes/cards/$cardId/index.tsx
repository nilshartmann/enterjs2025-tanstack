import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { z } from "zod";
import { zodValidator } from "@tanstack/zod-adapter";
import { fetchCardDetailOpts } from "@/queries.ts";
import CardDetail from "@/components/CardDetail.tsx";

const CardIdSearchParams = z.object({
  showComments: z.boolean().optional(),
});

export const Route = createFileRoute("/cards/$cardId/")({
  component: RouteComponent,
  validateSearch: zodValidator(CardIdSearchParams),
});

function RouteComponent() {
  const cardId = Route.useParams().cardId;

  const { data: card } = useSuspenseQuery(fetchCardDetailOpts(cardId));

  return <CardDetail card={card} />;
}
