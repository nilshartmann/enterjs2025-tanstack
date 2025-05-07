import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { z } from "zod";
import { zodValidator } from "@tanstack/zod-adapter";
import { fetchCardDetailOpts, fetchCommentsOpts } from "@/queries.ts";
import CardDetail from "@/components/CardDetail.tsx";
import LoadingIndicator from "@/components/LoadingIndicator.tsx";

const CardIdSearchParams = z.object({
  showComments: z.boolean().optional(),
});

export const Route = createFileRoute("/cards/$cardId/")({
  component: RouteComponent,
  validateSearch: zodValidator(CardIdSearchParams),
  pendingComponent: LoadingIndicator,
  loader({ context, params }) {
    context.queryClient.ensureQueryData(fetchCommentsOpts(params.cardId));

    return context.queryClient.ensureQueryData(
      fetchCardDetailOpts(params.cardId),
    );
  },
});

function RouteComponent() {
  const cardId = Route.useParams().cardId;

  const { data: card } = useSuspenseQuery(fetchCardDetailOpts(cardId));

  return <CardDetail card={card} />;
}
