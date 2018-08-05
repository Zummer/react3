import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import bodyParser from 'body-parser';
import expose from './expose.js';
const {__dirname} = expose;

dotenv.config();
const app = express();

app.use(bodyParser.json());

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(process.env.NODE_SERVER_PORT, () => console.log(`Server running on localhost:${process.env.NODE_SERVER_PORT}`));
