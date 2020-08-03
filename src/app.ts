import express, { Application, Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { sequelize } from './configs/db.config';
import logger from './services/logger.service';
import { UserRoutes } from './routes/user.route';
import { ProfileRoutes } from './routes/profile.route'
import { StaticRoutes } from './routes/static.routes'
import { DiaryRoutes } from './routes/diary.route'
class App {

    public app: Application;
    public static : StaticRoutes = new StaticRoutes();
    public user: UserRoutes = new UserRoutes();
    public profile: ProfileRoutes = new ProfileRoutes();
    public diary: DiaryRoutes = new DiaryRoutes();
    constructor() {
        this.app = express();
        this.initilizeDB();
        this.initilizeMiddlewares();
        this.static.routes(this.app);
        this.user.routes(this.app);
        this.profile.routes(this.app);
        this.diary.routes(this.app);
        this.initilizeErrorHandler();
    }

    private initilizeDB = () => {
        import('./models')
            .then(_ => sequelize.authenticate())
            // .then(_ => sequelize.sync({ force: false })) //--> WILL CLEAR THE WHOLE DATABSE.
            .then(_ => logger.info(`connected to database.`))
            .catch(e => console.error(e));
    }

    private initilizeMiddlewares = () => {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(morgan("dev"));
    }

    private initilizeErrorHandler = () => {
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            const error: any = new Error(`${req.originalUrl} not found.`);
            error.statusCode = 404;
            error.data = {}
            next(error);
        });
        this.app.use((error: any, req: Request, res: Response, next: NextFunction) => {
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