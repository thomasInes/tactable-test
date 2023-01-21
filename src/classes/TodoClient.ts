import axios from "axios";
import { injectable } from "inversify";
import { StatusCodes } from 'http-status-codes';
import { IHttpClient } from "../interfaces";

@injectable()
export class TodoClient implements IHttpClient {
    /**
     * 
     * @param url string: endpoint to hit
     * @returns the data from the endpoint if the response is successful 
     */
    public get = async (url: string) => {
        const response = await axios.get(url);
        
        if (response.status !== StatusCodes.OK)
            throw new Error(`Unsuccesful API response: status code(${response.status}) body(${response.data})`)

        return response.data;
    }
}