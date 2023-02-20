import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { JWT_CONF } from '../config';

class Authentication {

  #secret

  set secret(secret) {
    this.#secret = secret
  }

  constructor() {
    this.secret = JWT_CONF.jwtApi.JWT_KEY_SECRET
  }

  generateJwt(payload: object | void = null): string {
    if (!payload) payload = {} // FIXME: Bullshit
    const token = jwt.sign(payload, this.#secret, {
      expiresIn: '1 days',
    })
    return token
  }

  generatePayload(payload: object | void): object {
    return {jwt: this.generateJwt()}
  }

  verifyJwt(token): object {
    try {
      return jwt.decode(token, this.#secret)
    } catch (error: unknown) {
      throw new Error('Invalid jwt')
    }
  }

}

export {Authentication}
