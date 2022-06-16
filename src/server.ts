import App from './app';
import UsersController from './router/users';
import ProductsController from './router/products';

 
const app = new App(
  [
    new UsersController(),
    new ProductsController(),
  ],
  4000,
);
 
app.listen();