import { Link, getRouteApi } from "@tanstack/react-router";
import { CardDto } from "@/types.ts";
import Card from "@/components/Card.tsx";
import CommentList from "@/components/CommentList.tsx";

type CardDetailProps = {
  card: CardDto;
};

const Route = getRouteApi("/cards/$cardId/");

export default function CardDetail({ card }: CardDetailProps) {
  // testen:
  //   http://localhost:3000/cards/C6?showComments=true
  //   http://localhost:3000/cards/C6?showComments=false

  const showComments = Route.useSearch().showComments;

  return (
    <div
      className={
        "container mx-auto my-8 flex flex-col items-center justify-center"
      }
    >
      <Card {...card} />

      {/*
        Beim klicken auf den Link wird nur diese Komponente neu gerendert!

        Achtung! Developer Tools zeigen das falsch an
          In NavBar.tsx logging hinzufügen um das zu sehen
        */}
      <Link
        to={"/cards/$cardId"}
        params={{ cardId: card.id }}
        search={{ showComments: !showComments }}
      >
        Toggle/Hide comments
      </Link>

      {showComments && <CommentList cardId={card.id} />}
    </div>
  );
}
