import axios, { AxiosError } from 'axios';
import { injectable } from 'inversify';
import { IHttpClient } from '../interfaces';

@injectable()
export class TodoClient implements IHttpClient {
  /**
   *
   * @param url string: endpoint to hit
   * @returns the data from the endpoint if the response is successful
   */
  public get = async (url: string) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error: unknown) {
      throw new Error(
        'Unsuccesful API response: '
        + `status code(${(error as AxiosError).response?.status}) `
        + `data(${JSON.stringify((error as AxiosError).response?.data)})`,
      );
    }
  };
}
