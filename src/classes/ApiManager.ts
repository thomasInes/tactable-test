import { injectable } from 'inversify';
import { IApiManager } from '../interfaces';
import { TodoClient } from './TodoClient';

@injectable()
export class ApiManager implements IApiManager {
  private _httpClient: TodoClient;

  public constructor(httpClient: TodoClient) {
    this._httpClient = httpClient;
  }

  /**
   *
   * @returns the data from the endpoint if the response is successful
   */
  public fetchData = () => {
    const APIEndpoint = process.env.APIURL || '';
    return this._httpClient.get(APIEndpoint);
  };
}
