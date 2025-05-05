import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchCardDetailOpts, fetchCommentsOpts } from "@/queries.ts";
import CardDetail from "@/components/CardDetail.tsx";

export const Route = createFileRoute("/cards/$cardId/")({
  component: RouteComponent,
  loader({ context, params }) {
    // Daten laden und in Query Cache packen
    //   hier noch nicht so richtig notwendig, aber später
    //   beim priorisieren/steuern, was SSR'ed wird

    // 🤔 WAS PASSIERT WENN, fetchCardDetailOpts UND Comments
    //  langsam sind?
    //   -> Beide Requests auf "slow=2000" setzen
    //   -> Zeit bis Seite vollständig geladen: fetchCardDetail + fetchCommentList

    context.queryClient.ensureQueryData(fetchCommentsOpts(params.cardId));

    return context.queryClient.ensureQueryData(
      fetchCardDetailOpts(params.cardId),
    );
  },
});

function RouteComponent() {
  const cardId = Route.useParams().cardId;
  //                                 ^--- typesafe!

  // Daten werden aus dem Cache geholt
  //   -> Cache zeigen
  const { data: card } = useSuspenseQuery(fetchCardDetailOpts(cardId));

  return <CardDetail card={card} />;
}
