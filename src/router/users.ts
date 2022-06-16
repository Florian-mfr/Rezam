import { Response, Request} from 'express'
import models from '../../models'
import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'
import JWTToken from '../utils/jwt'
import BaseController from '.'
import { validate, ValidationError } from 'express-validation'
import Validation from '../middleware/Validation'
import { Models } from '../interfaces/Models'
import { User } from '../interfaces/User'
 
export default class UsersController extends BaseController {
  protected modelName = Models.User
  protected Model = User
  private validation = new Validation(Models.User)

  constructor() {
    super()
    this.intializeRoutes()
  }
 
  public intializeRoutes() {
    this.router.get('/users', this.getAllModel)
    this.router.get('/users/:id', this.getOneModel)
    this.router.post('/users/register', validate(this.validation.getValidationSchema()), this.register);
    this.router.post('/users/login', validate(this.validation.getValidationSchema()), this.login);
  }
 
  private async register (req: Request, res: Response) {
    const email = req.body.email
    const username = req.body.username
    const password = req.body.password
    const role = req.body.role
    const account = req.body.account

    if (!email || !username || !password || !account || !role) return res.status(400).json({error: 'missing parameters'})
    // if (!['ADMIN', 'SUPERADMIN'].includes(role)) return res.status(403).json({error: 'create user forbidden'})

    let user

    try {
      user = await models.User.findOne({
        attributes: ['username'],
        where: { username: username }
      })
    } catch (err) {
      return res.status(500).json({message: 'error findone user', error: err})
    }

    if (user) return res.status(409).json({error: 'user already exist', message: user})

    try {
      const hash = await bcrypt.hash(password, 5)
      await models.User.create({ id: uuidv4(), email, username, password: hash, role, account })
    } catch (err) {
      return res.status(500).json({message: 'error create user', error: err})
    }

    return res.status(201).json({success: 'user successfully registered'})
  }
 
  private async login (req: Request, res: Response) {
    const username = req.body.username
    const password = req.body.password

    if (!username || !password) return res.status(400).json({error: 'missing parameters'})
    // if (!['ADMIN', 'SUPERADMIN'].includes(role)) return res.status(403).json({error: 'create user forbidden'})

    let user

    try {
      user = await models.User.findOne({
        where: { username: username }
      })
    } catch (err) {
      return res.status(500).json({message: 'error findone user', error: err})
    }

    if (!user) return res.status(404).json({error: 'user not found'})

    const resBcrypt = await bcrypt.compare(password, user.password)

    if (!resBcrypt) return res.status(400).json({error: 'bad password'})

    return res.status(200).json({
      userId: user.id,
      token: new JWTToken().generateToken(user)
    })
  }
}
