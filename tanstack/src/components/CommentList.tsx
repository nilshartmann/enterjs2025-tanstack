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

         LOOK AT INDEX.HTML:
           - LOADING INDICATOR IS SSR-ED!!
           - DATA SENT LATER ("STREAMING")

      */}
      <Suspense
        fallback={<LoadingIndicator>Loading Comments....</LoadingIndicator>}
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
  // WHAT HAPPENS IF THIS TAKES LONG?
  const { data: comments } = useSuspenseQuery(fetchCommentsOpts(cardId));

  return comments.map((c) => (
    <div key={c.id} className={"CommentItem"}>
      <h2>{c.text}</h2>
    </div>
  ));
}
