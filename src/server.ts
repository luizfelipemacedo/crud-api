import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import routes from './routes/index';

const app = express();

app.use(express.json());
app.use(errorHandler);
app.use(routes);

const PORT = 3000;

app.listen(PORT, () => {
  console.info(`Server is running on port ${PORT}`);
});

async function errorHandler(error: Error, _request: Request, response: Response, _next: NextFunction) {
  console.error(error);
  return response.json({ message: 'Internal Server Error!' }).status(500);
}