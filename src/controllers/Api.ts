import { Request, Response } from 'express';
import { container } from "../classes/inversify.config";
import { ApiManager } from "../classes/ApiManager";
import { IApiManager } from "../interfaces";

/**
 * 
 * @param req Request: express Request object
 * @param res Response: express Response object
 * @returns displays the data fetched by te APIManager if no error
 */
export const showData = async (req: Request, res: Response): Promise<Response> => {
    try {
        const Api = container.get<IApiManager>(ApiManager);
        return res.status(200).send(await Api.fetchData());
    } catch (error) {
        return res.status(500).send(error);
    }
}