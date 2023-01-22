import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { StatusCodes } from "http-status-codes";
import { container } from "../../../classes/inversify.config";
import { TodoClient } from "../../../classes/TodoClient";

const mock = new MockAdapter(axios);

const httpClient = container.get<TodoClient>(TodoClient);
const APIUrl = 'dummyApi.io';

describe('TodoClient', () => {
    beforeAll(() => {
        mock.onGet().reply(StatusCodes.OK, {data: 'dummyData'});
    })
    describe('get', () => {

        test('returns the data from API', async () => {
            const data = await httpClient.get(APIUrl)
            expect(data).toStrictEqual({ data: 'dummyData' });
        });

        test('throws an error if API response is not successful', async () => {
            mock.onGet().reply(StatusCodes.INTERNAL_SERVER_ERROR, { body: 'dummy error from API' });

            await expect(httpClient.get(APIUrl))
            .rejects
            .toThrow('Unsuccesful API response: status code(500) data({"body":"dummy error from API"})');
        });
    });
});