import { Link } from "@tanstack/react-router";
import { CardDto, CardDtoList } from "@/types";
import { LikesWidget } from "@/components/LikesWidget";

type CardListProps = {
  cards: CardDtoList;
};
export default function CardList({ cards }: CardListProps) {
  return (
    <div className={"CardList"}>
      {cards.map((card) => (
        <CardItem key={card.id} card={card} />
      ))}
    </div>
  );
}

type CardItemProps = {
  card: CardDto;
};

function CardItem({ card }: CardItemProps) {
  return (
    <div className={"CardItem"}>
      <div className={"flex items-center justify-between space-x-8"}>
        <img src={`/images/${card.image}`} alt={card.title} />
        <Link
          to={"/cards/$cardId"}
          params={{
            cardId: card.id,
          }}
        >
          <h2>{card.title}</h2>
        </Link>
      </div>
      <LikesWidget cardId={card.id} currentLikes={card.likes} />
    </div>
  );
}
