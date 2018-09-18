import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import express, {NextFunction, Request, Response} from 'express';
import Knex from 'knex';
import {Model} from 'objection';
import path from 'path';
import knexConfig from '../knexfile';
import users from './routes/users';

Model.knex(Knex(knexConfig.development));

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use('/api/users', users);

app.get('/*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.use(errorHandler);

function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    res.status(500).json({error: err.message});
}

app.listen(process.env.NODE_SERVER_PORT, () =>
    console.log(`Server running on localhost:${process.env.NODE_SERVER_PORT}`));
