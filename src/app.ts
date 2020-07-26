import * as express from 'express';
import cors from 'cors';
import { UserRoutes } from './routes/user.routes';
import { sequelize } from './configs/db.config'
import logger from './services/logger';
import { responses } from './utils/helper.functions'
class App {
    public app: express.Application;
    // all the routes goes here.
    public user: UserRoutes = new UserRoutes();
    constructor() {
        this.app = express.default();
        this.initializeDB();
        this.initilizeMiddleware();
        this.user.routes(this.app);
        this.errorHandler();
    }

    private initilizeMiddleware = () => {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cors())
    }

    private initializeDB = async () => {
        import('./models')
            .then(_ => sequelize.authenticate())
            .then(_ => logger.info('DB Connected successfully.'))
            .catch(error => logger.error(error.message))
    }

    private errorHandler = () => {
        this.app.use((req, res, next) => responses.failed(res, `${req.originalUrl} not found`))
    }
}

export default new App().app;