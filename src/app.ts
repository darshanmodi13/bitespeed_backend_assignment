import { PORT, NODE_ENV } from '@config/env';
// Dependencies
import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import { useExpressServer, getMetadataArgsStorage, NotFoundError } from 'routing-controllers';
import helmet from 'helmet';
import hpp from 'hpp';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';

// Swagger
import { routingControllersToSpec } from 'routing-controllers-openapi';
import swaggerUI from 'swagger-ui-express';

// Base Error Class
import { HTTPErrorHandler } from './middlewares/HTTPErrorHandler';
import { url } from 'inspector';

export class App {
	public app: express.Application;
	public env: string | undefined;
	public port: string | number | undefined;

	constructor() {
		this.app = express();
		this.env = NODE_ENV;
		this.port = PORT || 8989;

		this.initializeMiddleWare();
		this.initializeRoutes();
		this.initializeSwagger();
		this.notListedRoutesHandler();
		// this.initializeErrorHandler();
	}

	private initializeRoutes() {
		useExpressServer(this.app, {
			controllers: [__dirname + '/controllers/**/*.controller.ts', __dirname + '/controllers/**/*.controller.js'],
			defaultErrorHandler: false,
			middlewares: [HTTPErrorHandler],
			routePrefix: '/api',
		});
	}
	private initializeMiddleWare() {
		this.app.use(morgan('tiny'));
		this.app.use(cors());
		this.app.use(hpp());
		this.app.use(helmet());
		this.app.use(compression());
		this.app.use(express.json({ limit: '50mb' }));
		this.app.use(
			express.urlencoded({
				limit: '50mb',
				extended: true,
				parameterLimit: 50000,
			})
		);
		this.app.use(cookieParser());
	}
	private notListedRoutesHandler() {
		this.app.all('*', (req, res) => {
			if (!res.headersSent) throw new NotFoundError('Route Not Found');
		});
	}

	private async initializeSwagger() {
		const metadataArgsStorage = getMetadataArgsStorage();
		// Generate the OpenAPI specification
		const spec = routingControllersToSpec(metadataArgsStorage);
		const swaggerSpec = {
			...spec,
			info: { ...spec.info, title: 'Documentation' },
			servers: [
				{
					url: `http://localhost:${this.port}/api`,
				},
				{
					url: `https://bitespeed-backend-assignment-kj3f.onrender.com/api`,
				},
			],
		};

		this.app.use('/api/docs', swaggerUI.serve);
		this.app.get('/api/docs', swaggerUI.setup(swaggerSpec));
	}

	public listen() {
		this.app.listen(this.port, () => {
			console.info(`:: [EXPRESS] Server Stared :: Environment :: ${this.env?.toUpperCase()} :: PORT :: ${this.port}`);
		});
	}

	public getApp() {
		return this.app;
	}
}
