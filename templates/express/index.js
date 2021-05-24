import express from 'express';
import cors from 'cors';

import config from '../config';
import testAPI from './test';
import mongoAPI from './mongo';

const app = express();
const expressURL = config.express.url;
const expressPort = config.express.port;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json()) // To parse incoming requests with JSON payloads

testAPI(app);
mongoAPI(app);

app.listen(expressPort, () => {
  console.log(`Express server for {{package.projectName}} listening on ${expressURL}:${expressPort}`);
})
