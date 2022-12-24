import express from 'express';
import request from 'supertest';
import * as bodyParser from 'body-parser';
import { heroesRouter } from '../modules/hero-module/router';
import { questsRouter } from '../modules/quest-module/router';

/**
 * Sets up supertest to use in jest spec files.  Heroes module
 * is already initialized
 *
 * @param {express.Router} router The router to initalize
 * @returns {request.SuperTest<request.Test>} A request test object
 */
export function supertestSetup(router) {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(heroesRouter());
    app.use(questsRouter());
    if (router) {
        app.use(router);
    }

    return request(app);
}
