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

  // "Problem": jetzt wird die pendingComponent SSR'ed
  pendingComponent: LoadingIndicator,

  loader({ context, params }) {
    // Jetzt wartet der Server bis das Promise aufgelöst ist,
    // und der Artikel wird SSR'ed
    //
    //  - Dank Suspense in CommentList wird _nicht_ auf die
    //    Kommentare gewartet
    //  - Kommentare werden gestreamed
    //  - Aber: Wasserfall

    // Jetzt laufen beide Queries parallel los
    //   wenn card- und comments-Query gleichen slow-Wert haben
    //   sehen wir keinen Loading Indicator mehr
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
