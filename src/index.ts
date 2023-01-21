import express, { Application } from 'express';
import bodyParser from 'body-parser';
import * as APIController from './controllers/Api';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', APIController.showData);

try {
  app.listen(PORT, (): void => {
    console.log(`Connected successfully on port ${PORT}`);
  });
} catch (error: unknown) {
  console.error(`Error occured: ${(error as Error).message}`);
}
