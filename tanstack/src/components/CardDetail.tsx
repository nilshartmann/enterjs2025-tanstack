import { Link, getRouteApi } from "@tanstack/react-router";
import { CardDto } from "@/types.ts";
import Card from "@/components/Card.tsx";
import CommentList from "@/components/CommentList.tsx";

type CardDetailProps = {
  card: CardDto;
};

const Route = getRouteApi("/cards/$cardId/");

export default function CardDetail({ card }: CardDetailProps) {
  const showComments = Route.useSearch().showComments;

  return (
    <div
      className={
        "container mx-auto my-8 flex flex-col items-center justify-center"
      }
    >
      <Card {...card} />

      <Link
        to={"/cards/$cardId"}
        params={{ cardId: card.id }}
        search={{ showComments: !showComments }}
      >
        Show / Hide comments
      </Link>

      {showComments && <CommentList cardId={card.id} />}
    </div>
  );
}
