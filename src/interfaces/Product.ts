export class Product {

  id: string

  name: string

  account: string

  price: number

  allergen: Array<string>

  ingredients: Array<string>

  alcohol: boolean

  constructor({name, price = 0, allergen = [], ingredients = [], alcohol = false}: IProduct, account: string) {
    this.name = name
    this.account = account
    this.price = price
    this.allergen = allergen
    this.ingredients = ingredients
    this.alcohol = alcohol
  }
}

export interface IProduct {
  name: string

  price: number

  allergen: Array<string>

  ingredients: Array<string>

  alcohol: boolean
}