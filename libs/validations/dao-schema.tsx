import { z } from 'zod';

// Define schema for individual social media object
const socialMediaSchema = z.object({
  type: z.string(),
  link: z.string(),
});

const member = z.object({
  address: z.string(),
});

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

const editDaoInfoLinksSchema = z.object({
  socialMedia: z.array(socialMediaSchema),
});


const editDaoInfoSchema = z.object({
  daoName: z
    .string()
    .min(2, { message: 'Must be 2 or more characters long' })
    .max(50, { message: 'Must be 50 or fewer characters long' }),
  logo: z.string()
});

const proposalInfoSchema = z.object({
  title: z
    .string()
    .min(2, { message: 'Must be 2 or more characters long' })
    .max(50, { message: 'Must be 50 or fewer characters long' }),
  description: z.string().min(2, { message: 'Description must not be empty' }),
  targetWallet: z.string().optional(),
  value: z.string().optional(),
  duration: z.coerce
    .number({
      required_error: 'Duration value is required',
      invalid_type_error: 'Duration value must be a number',
    })
    .min(1).optional(),
  minimum: z.coerce
    .number({
      required_error: 'Minimum value is required',
      invalid_type_error: 'Minimum value must be a number',
    })
    .min(1, { message: '1 day is the least expiration days' })
    .max(3, { message: '3 days is the minimum expiration days' }).optional(),
  maximum: z.coerce
    .number({
      required_error: 'Maximum value is required',
      invalid_type_error: 'Maximum value must be a number',
    })
    .min(3, { message: '3 days is the least expiration days' })
    .max(7, { message: '7 days is the maximun expiration days' }).optional(),
  quorum: z.number().optional(),
});

const defineMembershipSchema = z.object({
  members: z.array(member),
});

const editProfile = z.object({
  name: z
    .string()
    .min(2, { message: 'Must be 2 or more characters long' })
    .max(50, { message: 'Must be 50 or fewer characters long' }),
  email: z.string().email(),
  about: z.string(),
});

const editNotifications = z.object({
  email_new_dao: z.boolean().optional(),
  email_new_proposal: z.boolean().optional(),
  email_new_updates: z.boolean().optional(),
  push_new_dao: z.boolean().optional(),
  push_new_proposal: z.boolean().optional(),
  push_new_updates: z.boolean().optional(),
});

const editDisplay = z.object({
  light_mode: z.boolean().optional(),
  dark_mode: z.boolean().optional(),
  device_settings: z.boolean().optional().default(true),
});

export { daoInfoSchema, defineMembershipSchema, proposalInfoSchema, editDaoInfoSchema, editDaoInfoLinksSchema, editProfile, editNotifications, editDisplay };
