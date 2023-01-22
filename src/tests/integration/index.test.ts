import express from "express";
import request from "supertest";
import dotenv from 'dotenv';
import { StatusCodes } from "http-status-codes";
import * as APIController from '../../controllers/Api';

dotenv.config(); // makes sure we are hitting the actual API
const app = express();
app.get('/', APIController.showData);

describe("testing server app main route", () => {
    it("GET / - success", async () => {
        const { body, statusCode } = await request(app).get("/");
        expect(statusCode).toBe(StatusCodes.OK)
        expect(body).toEqual(
            expect.arrayContaining([{
                userId: 1,
                id: 1,
                title: "delectus aut autem",
                completed: false
            }])
        );
    });
});