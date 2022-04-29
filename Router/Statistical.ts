import express from 'express';
import { Router } from "express";
import { StatisticalController } from "../Controllers/Statistical"
import bodyParser from 'body-parser';


const Controller = new StatisticalController();


export class StatisticalRouter {
    public Router: Router;

    constructor() {
        this.Router = Router();
        this.routers();
        this.config();
    }

    routers() {
        this.Router.get('/Service-most/:month/:year', Controller.findServiceMost);
    }

    public config(): void {
        this.Router.use(express.json());
        this.Router.use(bodyParser.urlencoded({ extended: true }));
    }
}