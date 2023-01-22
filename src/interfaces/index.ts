export interface IApiManager {
  fetchData(): Promise<string | object>;
}
export interface IHttpClient {
  get?(url: string): Promise<string | object>;
}
