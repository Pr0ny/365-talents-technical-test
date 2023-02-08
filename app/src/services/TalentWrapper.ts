import {environmentListValidation} from "../validators/wrapper"
import Joi from "joi";
import APIWrapper from "../libs/APIWrapper"

/**
 * Wrapper to access the 365Talent API.
 * Please use env based credential.
 */
class TalentWrapper extends APIWrapper { // Extend an APIWrapper for finner env management

  constructor(url) {
    super();
    this.url = url;
  }

  async partnerAuthenticate(partner: string, password: string) {
    const endpoint = '/v1/auth/jwt'
    console.log(partner)
    const response = await this.post(endpoint, {partner: partner, password: password})
    console.log(JSON.stringify(response))
  }

  async userAuthenticate() {}
}

export {TalentWrapper}
