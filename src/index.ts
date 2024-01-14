import express, { Application, Request, Response } from 'express';
import Database from './config/database';
import AdministratorRouter from './router/AdministratorRouter';

class App {
    public app: Application;

    constructor() {
        this.app = express();
        this.connectDatabase();
        this.plugins();
        this.routes();
    }

    protected plugins(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    protected routes(): void {
        this.app.route('/').get((req: Request, res: Response) => {
            res.send('Hello world!');
        });
        this.app.use('/api/v1/admin', AdministratorRouter);
    }

    protected connectDatabase(): void {
        const db = new Database();
        db.sequelize?.sync();
    }
}

const port: number = 8000;
const app = new App().app;

app.listen(port, () => {
    console.log('The server is running on http://localhost:8000');
});