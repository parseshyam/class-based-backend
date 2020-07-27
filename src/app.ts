import * as express from 'express';
import cors from 'cors';
import { UserRoutes } from './routes/user.routes';
import { sequelize } from './configs/db.config'
import logger from './services/logger';
class App {
    public app: express.Application;
    // all the routes goes here
    public user: UserRoutes = new UserRoutes();
    // initilize express app with prerequsite
    constructor() {
        this.app = express.default();
        this.initializeDB();
        this.initilizeMiddleware();
        this.user.routes(this.app);
        this.errorHandler();
    }
    // initilize all the middlewares.
    private initilizeMiddleware = () => {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cors())
    }
    // initilize the db instance
    private initializeDB = async () => {
        import('./models')
            .then(_ => sequelize.authenticate())
            .then(_ => logger.info('DB Connected successfully.'))
            .catch(error => logger.error(error.message))
    }
    // initilize centeralized error handler for db and express errors.
    private errorHandler = () => {
        // error handler for undefined routes
        this.app.use((req, res, next) => {
            const error: any = new Error(`${req.originalUrl} not found.`);
            error.statusCode = 404;
            error.data = {}
            next(error);
        });
        // error handler to catch all db and validations errors
        this.app.use((error: any, req: any, res: any, next: any) => {
            if (error?.original) {
                error.message = error.original?.detail || error.original?.routine || "db error.";
                error.data = error?.errors?.length > 0 ? error.errors.filter((e: any) => delete e.instance) : []
            }
            return res.status(error.statusCode || 500).json({
                status: false,
                message: error.message || "",
                value: error.data || {}
            })
        });
    }
}

export default new App().app;