import APIWrapper from "../libs/APIWrapper"

/**
 * Wrapper to access the 365Talent API.
 * Please use env based credential.
 */
class TalentWrapper extends APIWrapper { // Extend an APIWrapper for finner env management

  #partnerLogin
  #partnerPassword
  #partnerMode
  #userJwt
  #partnerJwt

  constructor(url: string, partner: boolean = true) {
    super();
    this.url = url;
    this.partner = partner;
  }

  setJwt(): void {
    if (this.#partnerMode) {
      this.jwt = this.#partnerJwt;
    } else {
      this.jwt = this.#userJwt;
    }
  }

  toggleMode(): void {
    this.#partnerMode = !this.#partnerMode;
    this.setJwt();
  }

  set partner(mode: boolean) {
    this.#partnerMode = mode;
    this.setJwt();
  }

  get partner(): boolean {
    return this.#partnerMode;
  }

  setPartnerCredential(login: string, password: string) {
    this.#partnerLogin = login;
    this.#partnerPassword = password;
  }

  set userToken(jwt) {
    if (jwt) {
      this.#userJwt = jwt
    }
  }

  async partnerAuthenticate(partner: string = this.#partnerLogin, password: string = this.#partnerPassword): Promise<boolean> {
    const endpoint = '/v1/auth/jwt';
    const response = await this.post(endpoint, {partner: partner, password: password});

    if (response?.status === 200) { // Check for successful response
      const jwt = response['data'];
      this.jwt = jwt;
      this.#partnerJwt = jwt;
      return true;
    } else {
      return false;
    }
  }

  async userAuthenticate(clientId: string, partner: string = this.#partnerLogin, password: string = this.#partnerPassword): Promise<string | void> {
    const endpoint = '/v1/auth/jwt';
    const response = await this.post(endpoint, {clientId: clientId, partner: partner, password: password});

    if (response?.status === 200) { // Check for successful response
      const jwt = response['data'];
      this.#userJwt = jwt;
      return jwt;
    }
  }

  async verifyAuthentication(): Promise<void> {
    if (this.jwt === null || this.isExpired()) {
      if (this.partner) {
        await this.partnerAuthenticate(this.#partnerLogin, this.#partnerPassword)
      } else {
        await this.userAuthenticate('', this.#partnerLogin, this.#partnerPassword);
      }
    }
  }

  async getSkills(version: number = 0): Promise<object | string | null> {
    await this.verifyAuthentication();

    const response = await this.get('/v1/skills', {version: version});
    // Check the content of the request response here (status, data, etc...)
    return response['data'];
  }

  async getSkillsCategories(): Promise<object | string | null> {
    await this.verifyAuthentication();

    const response = await this.get('/v1/skills/categories');
    // Check the content of the request response here (status, data, etc...)
    return response['data'];
  }

  async getUsers(page: number = 0,
                 pageSize: number = 100,
                 hasValidatedCharter: boolean | null = null,
                 modifiedAfter: string | null = null): Promise<object | string | null> {
    await this.verifyAuthentication();
    const params = {
      page: page,
      pageSize: pageSize
    };

    if (hasValidatedCharter !== null) {
      params['hasValidatedCharter'] = hasValidatedCharter;
    }

    if (modifiedAfter !== null) {
      params['modifiedAfter'] = modifiedAfter;
    }

    const response = await this.get('/v1/users', params);
    // Check the content of the request response here (status, data, etc...)
    return response['data'];
  }

  async getActiveUsers(page: number = 0, pageSize: number = 100): Promise<object | string | null> {
    await this.verifyAuthentication();

    const response = await this.get('/v1/users/active', {page: page, limit: pageSize});
    // Check the content of the request response here (status, data, etc...)
    return response['data'];
  }

  async getSuggestion(userJwt): Promise<object | string | null> {
    const jwt = this.jwt;

    this.partner = false; // Switch to user jwt

    const response = await this.get('/v1/suggestions');

    this.toggleMode(); // Get Back to 'default' mode which is partner mode
    return response['data'];
  }

  async getUser(): Promise<object | null> {
    this.partner = false; // Switch to user jwt

    const response = await this.get('/v1/users/me');

    this.toggleMode(); // Get Back to 'default' mode which is partner mode
    return response['data'];
  }

  async getUserOpportunities(): Promise<object | null> {
    this.partner = false; // Switch to user jwt

    const response = await this.get('/v1/opportunities/suggested');

    this.toggleMode(); // Get Back to 'default' mode which is partner mode
    return response['data'];
  }

  async getUserAllowedOpportunitiesTypes(): Promise<object | null> {
    this.partner = false; // Switch to user jwt

    const response = await this.get('/v1/opportunities/types');

    this.toggleMode(); // Get Back to 'default' mode which is partner mode
    return response['data'];
  }

  async getUserOpportunityById(id: string | number, isClientId: boolean = false): Promise<object | null> {
    this.partner = false; // Switch to user jwt

    const response = await this.get(`/v1/opportunities/${id}`, {isClientId: isClientId});

    this.toggleMode(); // Get Back to 'default' mode which is partner mode
    return response['data'];
  }

  async postUserValidateChart(clientId: string, validationDate: string) {
    this.partner = false; // Switch to user jwt

    const response = await this.post(`/v1/user/validateCharter`, {clientId: clientId, validationDate: validationDate});

    this.toggleMode(); // Get Back to 'default' mode which is partner mode
    return response['data']
  }

}

export {TalentWrapper}
