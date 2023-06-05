import { z } from "zod";
import { urlValidator } from "./common";

const requiredUrlValidator = urlValidator({ required: true });

export const feedCreateRequestBodySchema = z.object({
  feedAlterUrl: z
    .string()
    .refine(requiredUrlValidator, { message: "URLを入力してください" }),
  feedTitle: z.string().nonempty({ message: "必須です" }),
  feedAuthor: z.string().nonempty({ message: "必須です" }),
  feedCreated: z
    .string()
    .regex(/[0-9]|[1-9][0-9]*/, { message: "0～9999の間で指定してください" }),
  feedSelfUrl: z
    .string()
    .refine(urlValidator(), { message: "URLを入力してください" }),
  entry: z
    .object({
      key: z.string().optional(),
      url: z.string().refine(requiredUrlValidator, {
        message: "URLを入力してください",
      }),
      title: z.string().nonempty({ message: "必須です" }),
      summary: z.string().nonempty({ message: "必須です" }),
      authorName: z.string().nonempty({ message: "必須です" }),
      created: z.string().datetime({
        offset: true,
        message: "必須です",
      }),
      updated: z.string().datetime({
        offset: true,
        message: "必須です",
      }),
    })
    .array()
    .optional(),
});
export type FeedCreateRequestBody = z.infer<typeof feedCreateRequestBodySchema>;
