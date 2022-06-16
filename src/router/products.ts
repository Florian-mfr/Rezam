import BaseController from '.'
import { Product } from '../interfaces/Product'
import { validate, ValidationError } from 'express-validation'
import Validation from '../middleware/Validation'
import { Models } from '../interfaces/Models'
 
export default class ProductsController extends BaseController {
  protected Model = Product
  protected modelName = Models.Product
  private validation = new Validation(Models.Product)

  constructor() {
    super()
    this.intializeRoutes()
  }
 
  public intializeRoutes() {
    this.router.get('/products', this.getAllModel)
    this.router.get('/products/:id', this.getOneModel)
    this.router.post('/products', validate(this.validation.getValidationSchema()), this.postModel)
    this.router.patch('/products/:id', validate(this.validation.getValidationSchema()), this.patchModel)
    this.router.delete('/products/:id', this.deleteModel)
  }
}
