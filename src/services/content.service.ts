import { BadRequestError } from 'routing-controllers';

// Types
import { ContentBodyAttr, TContentBody } from '@/types/content.type';
import { TSelectContent } from '@/db/Content/schema';
import { createContent, findPrimayLinkPrecendence, findAndUpdateSecondaryLinkPrecedence, createContentIfNew, findRecords } from '@/db/Content/queries';
import { num } from 'envalid';

type TResponse = {
	Content: TSelectContent | null;
	parentContentTable: TSelectContent | null;
};
export class ContentService {
	private formateResponse(data: TResponse[]) {
		if (!data || !data.length || !data[0].parentContentTable) {
			return null;
		}

		const emails = new Set<string | null>();
		const phoneNumbers = new Set<string | null>();
		const res = {
			contact: {
				primaryContatctId: data[0].parentContentTable.id,
				emails: [],
				phoneNumbers: [],
				secondaryContactIds: [],
			},
		};

		data.map((d) => {
			if (d.parentContentTable) {
				emails.add(d.parentContentTable.email);
				phoneNumbers.add(d.parentContentTable.phoneNumber);
			}
			if (d.Content) {
				emails.add(d.Content.email);
				phoneNumbers.add(d.Content.phoneNumber);
				res.contact.secondaryContactIds.push(d.Content.id as never);
			}
		});
		res.contact.emails = [...emails] as never[];
		res.contact.phoneNumbers = [...phoneNumbers] as never[];
		return res;
	}

	async identify(body: TContentBody) {
		ContentBodyAttr.parse(body);

		// find oldest primary link precedence
		const primaryRecord: TSelectContent[] = await findPrimayLinkPrecendence(body.email, body.phoneNumber);

		if (!primaryRecord || primaryRecord.length == 0) {
			const response = await createContent({ ...body, linkPrecedence: 'primary' });
			return this.formateResponse([{ Content: null, parentContentTable: response[0] }]);
		}

		// Insert record if it is unique
		const newInsertedContent = await createContentIfNew(primaryRecord[0].id, body.email, body.phoneNumber);

		// update if same records exists with primary link precedence
		const secondaryRecords = await findAndUpdateSecondaryLinkPrecedence(primaryRecord[0].id, body.email, body.phoneNumber);

		const records = await findRecords(body.email, body.phoneNumber);
		return this.formateResponse(records);
	}
}
