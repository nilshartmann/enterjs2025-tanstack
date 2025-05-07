import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import { CommentDtoList } from "@/types";
import { fetchCommentsOpts } from "@/queries.ts";
import LoadingIndicator from "@/components/LoadingIndicator.tsx";

type CommentListProps = {
  cardId: string;
};
export default function CommentList({ cardId }: CommentListProps) {
  return (
    <div className={"CommentList"}>
      <h1>Comments</h1>
      {/*

      Mit dieser "Sollbruch-Stelle" wird auf dem Server nur bis zur
      Suspense-Boundary gerendert.
        - SSR'ed wird dann der Platzhalter (für uns OK, weil die Kommentare
          eine niedrigere Priorität als der Rest der Seite haben)

        - DIE FERTIG GERENDERTE (!!!) CommentList wird nachgeschickt
      */}
      <Suspense
        fallback={<LoadingIndicator>Loading comments</LoadingIndicator>}
      >
        <CommentListView cardId={cardId} />
      </Suspense>
    </div>
  );
}

type CommentListViewProps = {
  cardId: string;
};

function CommentListView({ cardId }: CommentListViewProps) {
  const { data: comments } = useSuspenseQuery(fetchCommentsOpts(cardId));

  return comments.map((c) => (
    <div key={c.id} className={"CommentItem"}>
      <h2>{c.text}</h2>
    </div>
  ));
}
