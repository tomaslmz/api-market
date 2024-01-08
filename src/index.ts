import express, { Application, Request, Response } from 'express';

class App {
    public app: Application;

    constructor() {
        this.app = express();
        this.routes();
    }

    protected routes(): void {
        this.app.route('/').get((req: Request, res: Response) => {
            res.send('Hello world!');
        });
    }
}

const port: number = 8000;
const app = new App().app;

app.listen(port, () => {
    console.log('The server is running on http://localhost:8000');
});