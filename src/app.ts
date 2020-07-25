import * as express from 'express';
import cors from 'cors';
import { UserRoutes } from './routes/user.routes';
import { sequelize } from './configs/db.config'
import logger from './services/logger'
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
        try {
            await import('./models');
            // await sequelize.sync({ force: false }); // !!WARNING THIS WILL CLEAR WHOLE DB!!
            await sequelize.authenticate()
            logger.info('DB Connected successfully.')
        } catch (error) {
            console.log(error)
        }
    }
    private errorHandler = () => {
        this.app.use((req, res, next) => {
            res.status(404).json({
                status: false,
                message: `${req.originalUrl} not found.`,
                value: {}
            })
        })
    }
}

export default new App().app;