import jwt from 'jsonwebtoken'

export default class JWTToken {
  private SECRET_KEY = 'hfj75BJ655fgcH65gfF65cgfDF654Bbvv6R'

  constructor() {
  }

  public parseJwt (token) {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''))

    return JSON.parse(jsonPayload)
  }

  public generateToken (user) {
    const token = jwt.sign(
      { id: user.id, username: user.username, account: user.account, role: user.role },
      this.SECRET_KEY, 
      { expiresIn: '2 days'}
    )
    return token
  }
}