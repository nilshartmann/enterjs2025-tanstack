import { Link } from "@tanstack/react-router";
import { CardDto } from "@/types.ts";
import Card from "@/components/Card.tsx";
import CommentList from "@/components/CommentList.tsx";

type CardDetailProps = {
  card: CardDto;
};
export default function CardDetail({ card }: CardDetailProps) {
  return (
    <div
      className={
        "container mx-auto my-8 flex flex-col items-center justify-center"
      }
    >
      <Card {...card} />

      {/*// WHAT HAPPENS IF THE CALL IN COMMENT LIST TAKES LONG*/}
      <CommentList cardId={card.id} />
    </div>
  );
}
