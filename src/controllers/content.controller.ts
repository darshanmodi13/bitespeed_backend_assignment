import { JsonController, Get, Req, Res, Post, Body, BadRequestError } from 'routing-controllers';
import { Request, Response } from 'express';

// Response
import StatusCodes from '@/utils/httpResponseCode';

// Swagger
import { OpenAPI } from 'routing-controllers-openapi';

// Service
import { ContentService } from '@/services/content.service';

// types
import { TContentBody } from '@/types/content.type';

enum Routes {
	ROOT = '/v1',
	IDENTIFY = '/identify',
}

@JsonController(Routes.ROOT)
class ContentController {
	private _contentService: ContentService;

	constructor() {
		this._contentService = new ContentService();
	}
	@Post(Routes.IDENTIFY)
	@OpenAPI({ description: 'Identify Route' })
	identify(@Req() req: Request, @Res() res: Response, @Body() body: TContentBody) {
		return this._contentService.identify(body);
	}
}

export default ContentController;
