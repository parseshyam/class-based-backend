import * as express from 'express';
import cors from 'cors';
import { UserRoutes } from './routes/user.routes';

class App {
    public app: express.Application;
    // all the routes goes here.
    public user: UserRoutes = new UserRoutes()
    constructor() {
        this.app = express.default();
        this.initializeDB();
        this.initilizeMiddleware();
        this.user.routes(this.app);
    }
    private initilizeMiddleware = () => {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cors())
    }
    private initializeDB = () => {

    }
}

export default new App().app;