import { z } from "zod";
import { urlValidator } from "./common";

export const wizardFormSchema = z.object({
  step: z.number().optional(),
  feedAlterUrl: z.string().refine(urlValidator({ required: true }), {
    message: "URLを入力してください",
  }),
  feedSelfUrl: z
    .string()
    .refine(urlValidator(), {
      message: "URLを入力してください",
    })
    .optional(),
  feedTitle: z.string().nonempty({ message: "必須です" }),
  feedAuthor: z.string().nonempty({ message: "必須です" }),
  feedCreated: z
    .string()
    .regex(/[0-9]|[1-9][0-9]*/, { message: "0～9999の間で指定してください" }),
});
export type WizardForm = z.infer<typeof wizardFormSchema>;
