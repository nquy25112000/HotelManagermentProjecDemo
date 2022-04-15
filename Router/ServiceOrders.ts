import express from 'express';
import { Router } from "express";
import { ServiceOrdersController } from "../Controllers/ServiceOrders"
import bodyParser from 'body-parser';


const Controller = new ServiceOrdersController();


export class ServiceOrdersRouter {
    public Router: Router;

    constructor() {
        this.Router = Router();
        this.routers();
        this.config();
    }

    routers() {
        this.Router.get('/findAll', Controller.findAll);
        this.Router.get('/findOne/:id', Controller.findOne);
        this.Router.get('/findItem', Controller.findItem);

        this.Router.post('/create', Controller.create);
        this.Router.put('/update/:id', Controller.update);
        this.Router.delete('/delete/:id', Controller.delete);
    }

    public config(): void {
        this.Router.use(express.json());
        this.Router.use(bodyParser.urlencoded({ extended: true }));
    }
}