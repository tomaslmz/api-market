import express, { Application, Request, Response } from 'express';
import Database from './config/database';

class App {
    public app: Application;

    constructor() {
        this.app = express();
        this.connectDatabase();
        this.routes();
    }

    protected routes(): void {
        this.app.route('/').get((req: Request, res: Response) => {
            res.send('Hello world!');
        });
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