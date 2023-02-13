import axios, {AxiosPromise, AxiosRequestConfig} from "axios";

class APIWrapper { // Maybe add one extra layer to define methods

  #jwt: string
  #baseUrl: string
  #expireAt: number | null

  constructor() {
    this.jwt = null;
    this.#expireAt = null;
  }

  get jwt(): string | null {
    return this.#jwt;
  }

  set jwt(jwt: string | null) {
    if (jwt !== null) {
      const payload = this.getJwtPayload(jwt);
      this.setJwtAuthenticationExpiration(payload['exp']);
      axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
      this.#jwt = jwt;
    } else {
      this.#jwt = null;
    }
  }

  set expirationDate(expirationDate: number) {
    this.#expireAt = expirationDate
  }

  isExpired() {
    const now = Date.now() / 1000; // Milliseconds to seconds

    return this.#expireAt === null || now > this.#expireAt;
  }

  set url(url: string) {
    this.#baseUrl = url;
  }

  get url(): string {
    return this.#baseUrl;
  }

  async executeRequest(option: AxiosRequestConfig): Promise<AxiosPromise> {
    try {
      return await axios.request(option);
    } catch (error) {
      if (error.response) {
        // Server error to handle...
        return error;
      } else if (error.request) {
        // No response from the server
        return error.request;
      } else {
        // Fatal error... Need to handle this :D
        return null
      }
    }
  }

  async post(endpoint: string, data: object): Promise<AxiosPromise> {
    const option: AxiosRequestConfig = this.craftConfig('POST', endpoint, data);
    return await this.executeRequest(option);
  }

  async get(endpoint: string, params: object | null = null): Promise<AxiosPromise> {
    const option: AxiosRequestConfig = this.craftConfig('GET', endpoint, null, params);
    return await this.executeRequest(option);
  }

  async put(): Promise<void> {}

  async delete(): Promise<void> {}

  craftUrl(endpoint: string): string {
    return `${this.#baseUrl}${endpoint}`;
  }

  craftConfig(method: string, endpoint: string | null, data: object | null = null, params: object | null = null): AxiosRequestConfig {
    return {
      method: method,
      url: this.craftUrl(endpoint),
      data: data,
      params: params
    };
  }

  setJwtAuthenticationExpiration(expirationDate: number): void {
    // We can do further date/timestamp verification here
    this.expirationDate = expirationDate;
  }

  getJwtPayload(token: string) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  }

}

export default APIWrapper
