import _ky from "ky";
import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { CardDto, CardDtoList, CommentDtoList } from "@/types";

const ky = _ky.extend({
  retry: 0,
  timeout: 30000,
});

const loadCardDetail = createServerFn({
  method: "GET",
})
  .validator((data) => {
    if (typeof data === "string") {
      return data;
    }

    throw new Error("Invalid data.");
  })
  .handler(async ({ data: cardId }) => {
    // Request wird nun im Server ausgeführt!
    const r = await ky
      .get(`http://localhost:7100/api/cards/${cardId}?slow=1250`)
      .json();
    return CardDto.parse(r);
  });

export const fetchCardDetailOpts = (cardId: string) =>
  queryOptions({
    queryKey: ["cards", "detail", cardId],
    async queryFn() {
      console.log("fetchCardDetailOpts", cardId);

      // Das Laden der Daten findet jetzt IMMER
      // auf dem Server statt,
      // die Daten landen aber trotzdem im Query CACHE

      return loadCardDetail({ data: cardId });
    },
  });

export const fetchCommentsOpts = (cardId: string) =>
  queryOptions({
    queryKey: ["cards", "detail", cardId, "comments"],
    async queryFn() {
      const r = await ky

        // Jetzt dauert das Laden GENAUSO LANGE, wie das Laden der
        //    CardDetail-Daten
        //    - Trotzdem wird die Suspense-Fallback-Komponente für die Kommentare
        //      angezeigt 🤔
        //      -> weil die Daten NACHEINANDER geladen werden
        .get(`http://localhost:7100/api/cards/${cardId}/comments?slow=1250`)
        .json();
      return CommentDtoList.parse(r);
    },
  });

export const fetchCardListOpts = () =>
  queryOptions({
    queryKey: ["cards", "list"],
    async queryFn() {
      const r = await ky.get("http://localhost:7100/api/cards").json();
      return CardDtoList.parse(r);
    },
  });
