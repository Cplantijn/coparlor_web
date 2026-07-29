import { z } from "zod";

export const askGameCoachFormSchema = z.object({
  userPrompt: z
    .string()
    .trim()
    .min(1, "Ask Coach needs a question.")
    .max(2_000, "Ask Coach questions must be 2,000 characters or fewer."),
});

export type AskGameCoachFormValues = z.input<typeof askGameCoachFormSchema>;
export type AskGameCoachRequest = z.output<typeof askGameCoachFormSchema>;
