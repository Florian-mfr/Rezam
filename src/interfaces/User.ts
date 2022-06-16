export class User {
  username: string

  email: string

  password: string

  account: string

  role: string

  constructor ({username, email, password, account, role}: IUser) {
    this.username = username
    this.email = email
    this.password = password
    this.account = account
    this.role = role
  }
}

export interface IUser {
  username: string

  email: string

  password: string

  account: string

  role: string
}