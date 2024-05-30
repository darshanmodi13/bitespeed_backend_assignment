import { z } from 'zod';

export const ContentBodyAttr = z
	.object({
		email: z.string().optional().nullable(),
		phoneNumber: z.string().optional().nullable(),
	})
	.strict()
	.refine((data) => data.email != null || data.phoneNumber != null, {
		message: 'Please provide email or phone number',
		path: ['email', 'phoneNumber'],
	});

export type TContentBody = z.infer<typeof ContentBodyAttr>;
