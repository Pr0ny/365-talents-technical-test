import axios, {AxiosPromise, AxiosRequestConfig, AxiosResponse} from "axios";

class APIWrapper {

  #jwt
  #baseUrl

  constructor() {
  }

  get jwt(): string {
    return this.#jwt;
  }

  set jwt(jwt: string) {
    this.#jwt = jwt;
  }

  set url(url: string) {
    this.#baseUrl = url;
  }

  get url(): string {
    return this.#baseUrl;
  }

  async post(endpoint: string, data: object): Promise<AxiosPromise> {
    console.log('Creation du POST')
    const option: AxiosRequestConfig = this.craftOption('POST', endpoint, data);
    console.log(JSON.stringify(option))
    return await axios.request(option)
  }

  get(endpoint, qp, params): void {
    const option = this.craftOption('GET', endpoint, params);
    return
  }

  craftUrl(endpoint): string {
    return `${this.#baseUrl}${endpoint}`
  }

  craftOption(method, endpoint, data): AxiosRequestConfig {
    const option = {
      method: method,
      url: this.craftUrl(endpoint),
      data: data
    }
    return option
  }

}
export default APIWrapper
