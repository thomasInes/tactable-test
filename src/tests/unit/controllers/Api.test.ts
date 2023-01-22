import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getMockReq, getMockRes } from '@jest-mock/express';
import { StatusCodes } from 'http-status-codes';
import * as APIController from '../../../controllers/Api';

const mock = new MockAdapter(axios);

describe('ApiManager', () => {
  beforeAll(() => {
    process.env.APIURL = 'dummyApi.io';
    mock.onGet().reply(StatusCodes.OK, { data: 'dummyData' });
  });
  describe('showData', () => {
    test('returns a 200 response with API data', async () => {
      const mockExpressRequest = getMockReq();
      const mockExpressResponse = getMockRes().res;
      await APIController.showData(mockExpressRequest, mockExpressResponse);

      expect(mockExpressResponse.send).toHaveBeenCalledWith({ data: 'dummyData' });
      expect(mockExpressResponse.status).toHaveBeenCalledWith(StatusCodes.OK);
    });
    test('returns a 500 response with an error message', async () => {
      const mockExpressRequest = getMockReq();
      const mockExpressResponse = getMockRes().res;
      mock.onGet().reply(404, { body: 'dummy error from API' });

      await APIController.showData(mockExpressRequest, mockExpressResponse);

      expect(mockExpressResponse.send).toHaveBeenCalledWith(
        new Error('Unsuccesful API response: status code(404) data({"body":"dummy error from API"})'),
      );
      expect(mockExpressResponse.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
    });
  });
});
