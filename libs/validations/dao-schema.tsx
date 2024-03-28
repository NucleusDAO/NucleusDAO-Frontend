import { z } from 'zod';

// Define schema for individual social media object
const socialMediaSchema = z.object({
  type: z.string(),
  link: z.string(),
});

const member = z.object({
  address: z.string()
})

const daoInfoSchema = z.object({
  daoName: z
    .string()
    .min(2, { message: 'Must be 2 or more characters long' })
    .max(50, { message: 'Must be 50 or fewer characters long' }),
  daoAddress: z
    .string()
    .min(20, { message: 'Must be 20 or more characters long' }),
    // .max(51, { message: 'Must be 51 or fewer characters long' }),
  logo: z.string(),
  about: z.string(),
  socialMedia: z.array(socialMediaSchema),
});

const defineMembershipSchema = z.object({
  members: z.array(member),
});

export { daoInfoSchema, defineMembershipSchema };
