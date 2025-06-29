import { z } from 'zod';

export const GabiChatMessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});
export type GabiChatMessage = z.infer<typeof GabiChatMessageSchema>;

export const GabiChatInputSchema = z.object({
  messages: z.array(GabiChatMessageSchema),
  monthlyIncome: z.number(),
  taxPreference: z.string().optional(),
});
export type GabiChatInput = z.infer<typeof GabiChatInputSchema>;
