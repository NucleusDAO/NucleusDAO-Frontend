import { z } from 'zod';

const newFeatureSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email' }),
  subject: z.string().min(2, { message: 'Your idea is required' }),
  descriptions: z.string().min(2, { message: 'Further details is required' }),
  image: z.string().optional(),
});

const reportSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email' }),
  bug: z.string().min(2, { message: 'Share your bug' }),
  descriptions: z.string().min(2, { message: 'Further details is required' }),
  image: z.string().optional(),
});

export { newFeatureSchema, reportSchema };
