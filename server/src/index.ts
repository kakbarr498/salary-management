import express from 'express';
import routes from './routes';

const app = express();
app.use(routes);

if (require.main === module) {
  const port = process.env.PORT || 4000;
  app.listen(port, () => console.log(`Server listening on ${port}`));
}

export default app;
