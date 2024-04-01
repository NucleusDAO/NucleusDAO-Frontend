import { z } from 'zod';

const newFeatureSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email' }),
  idea: z.string().min(2, { message: 'Your idea is required' }),
  further_details: z
    .string()
    .min(2, { message: 'Further details is required' }),
  image: z.string().optional(),
});

export { newFeatureSchema };
