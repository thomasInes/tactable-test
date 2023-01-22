import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { StatusCodes } from 'http-status-codes';
import { container } from "../../../classes/inversify.config";
import { ApiManager } from "../../../classes/ApiManager";

const mock = new MockAdapter(axios);

const Api = container.get<ApiManager>(ApiManager);

describe('ApiManager', () => {
    beforeAll(() => {
        process.env.APIURL = 'dummyApi.io';
        mock.onGet().reply(StatusCodes.OK, { data: 'dummyData' });
    })
    describe('fetchData', () => {
        
        test('returns the data from API', async () => {
            const data = await Api.fetchData()
            expect(data).toStrictEqual({ data: 'dummyData' });
        });

        test('throws an error if API response is not successful', async () => {
            mock.onGet().reply(StatusCodes.INTERNAL_SERVER_ERROR, { body: 'dummy error from API' });

            await expect(Api.fetchData())
            .rejects
            .toThrow('Unsuccesful API response: status code(500) data({"body":"dummy error from API"})');
        });
    });
});