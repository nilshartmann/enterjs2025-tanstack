import ky from "ky";
import { useEffect, useState } from "react";

import { CardDto, CardDtoList } from "../types.ts";
import Card from "./Card.tsx";

// const title = "Happy Birthday!";
// const image = "01.png";
// const message = "I wish you a nice birthday!"

export default function App() {
  const [cards, setCards] = useState<CardDto[]>([]);

  useEffect(() => {
    async function loader() {
      const response = await ky.get("http://localhost:7100/api/cards").json();
      const cardsFromServer = CardDtoList.parse(response);
      console.log("cardsFromServer", cardsFromServer);
      setCards(cardsFromServer);
    }
    loader();
  }, []);

  // Zod: Validating Data

  return (
    <div className={"container mx-auto"}>
      {cards.map((c) => (
        <Card key={c.id} title={c.title} message={c.message} image={c.image} />
      ))}
      {/*<CardEditor/>*/}
      {/*<Card*/}
      {/*  title="Happy Birthday!"*/}
      {/*  image="01.png"*/}
      {/*  message="I wish you a nice birthday!"*/}
      {/*/>*/}
      {/*  <Card*/}
      {/*    title="Hello React"*/}
      {/*    image="02.png"*/}
      {/*    message="Have fun with React!"*/}
      {/*  />*/}
    </div>
  );
}
