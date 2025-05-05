import { z } from "zod";

export const CardDto = z.object({
  id: z.string(),
  title: z.string().min(4),
  message: z.string(),
  image: z.string(),
  likes: z.number(),
});

export type CardDto = z.infer<typeof CardDto>;

export const CardDtoList = CardDto.array();
export type CardDtoList = z.infer<typeof CardDtoList>;

export const CommentDto = z.object({
  id: z.string(),
  author: z.string(),
  text: z.string(),
});
export type CommentDto = z.infer<typeof CommentDto>;

export const CommentDtoList = CommentDto.array();
export type CommentDtoList = z.infer<typeof CommentDtoList>;
