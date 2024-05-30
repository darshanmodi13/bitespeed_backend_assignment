import { Middleware, ExpressErrorMiddlewareInterface, HttpError, HttpCode } from 'routing-controllers';
import { ZodError } from 'zod';

@Middleware({ type: 'after' })
export class HTTPErrorHandler implements ExpressErrorMiddlewareInterface {
	error(error: any, request: any, response: any, next: (err?: any) => any) {
		if (error instanceof HttpError) {
			response.status(error.httpCode).json({
				name: error.name,
				message: error.message,
			});
		} else if (error instanceof ZodError) {
			response.status(400).json({
				name: error.errors[0].code,
				message: error.errors[0].message,
			});
		} else {
			response.status(500).json({
				name: 'InternalServerError',
				message: 'Something went wrong!',
			});
		}
	}
}
