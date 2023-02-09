import APIWrapper from "../libs/APIWrapper"

/**
 * Wrapper to access the 365Talent API.
 * Please use env based credential.
 */
class TalentWrapper extends APIWrapper { // Extend an APIWrapper for finner env management

  #partnerLogin
  #partnerPassword
  #partnerMode

  constructor(url: string, partner: boolean) {
    super();
    this.url = url;
    this.partner = partner;
  }

  toggleMode(): void {
    this.#partnerMode = !this.#partnerMode;
  }

  set partner(mode: boolean) {
    this.#partnerMode = mode;
  }

  get partner(): boolean {
    return this.#partnerMode;
  }

  setPartnerCredential(login: string, password: string) {
    this.#partnerLogin = login;
    this.#partnerPassword = password;
  }

  async partnerAuthenticate(partner: string, password: string): Promise<boolean> {
    const endpoint = '/v1/auth/jwt';
    const response = await this.post(endpoint, {partner: partner, password: password});

    if (response.status === 200) {
      this.jwt = response['data'];
      return true;
    } else {
      return false;
    }
  }

  async userAuthenticate(): Promise<void> {}

  async verifyAuthentication(): Promise<void> {
    if (this.jwt === null || this.isExpired()) {
      if (this.partner) {
        await this.partnerAuthenticate(this.#partnerLogin, this.#partnerPassword)
      } else {
        await this.userAuthenticate();
      }
    }
  }

  async getSkills(version: number = 0): Promise<object | string | null> {
    await this.verifyAuthentication();

    const response = await this.get('/v1/skills', {version: version});
    return response['data'];
  }

  async getSkillsCategories(): Promise<object | string | null> {
    await this.verifyAuthentication();

    const response = await this.get('/v1/skills/categories');
    return response['data'];
  }

  async getUsers(page: number = 0,
                 limit: number = 100,
                 hasValidatedCharter: boolean | null = null,
                 modifiedAfter: string | null = null): Promise<object | string | null> {
    await this.verifyAuthentication();

    const response = await this.get('/v1/users',
      {
        page: page,
        limit: limit,
        hasValidatedCharter: hasValidatedCharter,
        modifiedAfter: modifiedAfter
      });
    return response['data'];
  }

  async getActiveUsers(page: number = 0, limit: number = 100): Promise<object | string | null> {
    await this.verifyAuthentication();

    const response = await this.get('/v1/users/active', {page: page, limit: limit});
    return response['data'];
  }

}

export {TalentWrapper}
