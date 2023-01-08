import App from '@/app';
import { IndexController } from '@controllers/index.controller';
import validateEnv from '@utils/validateEnv';
import { PortfolioController } from '@controllers/portfolio.controller';
import { BackofficeController } from '@controllers/backoffice.controller';
validateEnv();

const app = new App([
  IndexController,
  PortfolioController,
  BackofficeController,

]);
app.listen();
