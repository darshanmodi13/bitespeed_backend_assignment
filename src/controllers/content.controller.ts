import { JsonController, Get, Req, Res, Post, Body, BadRequestError } from 'routing-controllers';
import { Request, Response } from 'express';

// Swagger
import { OpenAPI } from 'routing-controllers-openapi';

// Service
import { ContentService } from '@/services/content.service';

// types
import { TContentBody } from '@/types/content.type';

enum Routes {
	ROOT = '',
	IDENTIFY = '/identify',
}

@JsonController(Routes.ROOT)
class ContentController {
	private _contentService: ContentService;

	constructor() {
		this._contentService = new ContentService();
	}
	@Post(Routes.IDENTIFY)
	@OpenAPI({
		description: 'Identify Route',
		requestBody: {
			content: {
				'application/json': {
					schema: {
						type: 'object',
						properties: {
							email: {
								type: 'string',
							},
							phoneNumber: {
								type: 'string',
							},
						},
					},
				},
			},
		},
	})
	identify(@Req() req: Request, @Res() res: Response, @Body() body: TContentBody) {
		return this._contentService.identify(body);
	}
}

export default ContentController;
