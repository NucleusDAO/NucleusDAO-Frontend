import { z } from 'zod';

const newFeatureSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email' }),
  subject: z.string().min(2, { message: 'Your idea is required' }),
  body: z.string().min(2, { message: 'Further details is required' }),
  imageUrl: z.string().optional(),
});

const reportSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email' }),
  subject: z.string().min(2, { message: 'Share your bug' }),
  body: z.string().min(2, { message: 'Further details is required' }),
  imageUrl: z.string().optional(),
});

export { newFeatureSchema, reportSchema };
