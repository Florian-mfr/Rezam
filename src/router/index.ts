import { Router, Response, Request } from "express"
import models from '../../models'
import JWTToken from "../utils/jwt"
import { v4 as uuidv4 } from 'uuid'

export default abstract class BaseController {
  protected router = Router()
  protected Model: any
  protected IModel: any
  protected modelName: string
  private JWT = new JWTToken()

  constructor () {
  }

  protected getAllModel = async (req: Request, res: Response): Promise<Response> => {
    const user = this.JWT.parseJwt(req.headers.authorization)
    try {
      const results = await models[this.modelName].findAll({
        where: { account: user.account }
      })
      if (!results?.length) return res.status(404).json({error: `${this.modelName}s not found`})
      return res.status(200).json({results})
    } catch (err) {
      return res.status(500).json({message: `error find ${this.modelName}s`, error: err})
    }
  }

  protected getOneModel = async (req: Request, res: Response): Promise<Response> => {

    if (!req.body.id && !req.params.id) return res.status(400).json({error: `invalid payload to get one ${this.modelName}`})

    const id = req.body.id || req.params.id

    try {
      const result = await models[this.modelName].findOne({where: { id: id } })
      if (!result) return res.status(404).json({error: `${this.modelName} not found`})
      return res.status(200).json({result})
    } catch (err) {
      return res.status(500).json({message: `error find ${this.modelName}`, error: err})
    }
  }

  protected postModel = async (req: Request, res: Response): Promise<Response> => {

    const user = this.JWT.parseJwt(req.headers.authorization)
    if (!['ADMIN', 'SUPERADMIN'].includes(user.role)) return res.status(403).json({error: `role admin is required to create ${this.modelName}`})

    let data = new this.Model(req.body, user.account)
    data.id = uuidv4()

    try {
      await models[this.modelName].create(data)
    } catch (err) {
      return res.status(500).json({message: `error create ${this.modelName}`, error: err})
    }
    return res.status(201).json({success: `${this.modelName} successfully created`})
  }

  protected putModel = async (req: Request, res: Response): Promise<Response> => {

    const user = this.JWT.parseJwt(req.headers.authorization)
    if (!['ADMIN', 'SUPERADMIN'].includes(user.role)) return res.status(403).json({error: `role admin is required to put ${this.modelName}`})

    let data = new this.Model(req.body)

    for (const [key, value] of Object.entries(req.body)) {
      if (!(key in data)) return res.status(400).json({error: `invalid payload to put ${this.modelName}`})
    }

    let result
    try {
      result = await models[this.modelName].findOne({ where: { id: data.id } })
      if (!result) return res.status(404).json({error: `${this.modelName} not found`})
    } catch (err) {
      return res.status(500).json({message: `error find ${this.modelName}`, error: err})
    }
    if (result.dataValues.account !== user.account) return res.status(403).json({error: `forbidden to put ${this.modelName}`})

    try {
      await result.update(req.body)
    } catch (err) {
      return res.status(500).json({message: `error put ${this.modelName}`, error: err})
    }
    return res.status(204).json({success: `${this.modelName} successfully putted`})
  }

  protected patchModel = async (req: Request, res: Response): Promise<Response> => {

    const user = this.JWT.parseJwt(req.headers.authorization)
    if (!['ADMIN', 'SUPERADMIN'].includes(user.role)) return res.status(403).json({error: `role admin is required to patch ${this.modelName}`})

    // let data = Object.assign({}, DefaultModel[this.modelName])
    // console.log(this.IModel)
    // if (!(req.body instanceof this.Model)) return res.status(400).json({error: `invalid payload to patch ${this.modelName}`})
    const data = new this.Model(req.body)
    for (const [key, value] of Object.entries(req.body)) {
      if (!(key in data)) return res.status(400).json({error: `invalid payload to patch ${this.modelName}`})
    }

    let result
    try {
      result = await models[this.modelName].findOne({ where: { id: req.params.id } })
      if (!result) return res.status(404).json({error: `${this.modelName} not found`})
    } catch (err) {
      return res.status(500).json({message: `error find ${this.modelName}`, error: err})
    }
    if (result.dataValues.account !== user.account) return res.status(403).json({error: `forbidden to patch ${this.modelName}`})
    try {
      await result.update(req.body)
    } catch (err) {
      return res.status(500).json({message: `error patch ${this.modelName}`, error: err})
    }
    return res.status(204).json({success: `${this.modelName} successfully patched`})
  }

  protected deleteModel = async (req: Request, res: Response): Promise<Response> => {

    if (!req.body.id && !req.params.id) return res.status(400).json({error: `invalid payload to delete ${this.Model}`})

    const id = req.body.id || req.params.id

    try {
      await models[this.Model].destroy({where: { id: id } })
    } catch (err) {
      return res.status(500).json({message: `error find ${this.Model}`, error: err})
    }
    return res.status(204).json({success: `${this.Model} successfully deleted`})
  }
}