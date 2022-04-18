import { RoleService } from '../Services/Role'
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { StatusCode } from './StatusCode';
import { BaseController } from './BaseController';
import passport from "passport";
const statusCode = new StatusCode();
const service = new RoleService();
const baseController = new BaseController();

export class RoleController {


    public findAll = (req: Request, res: Response, next: NextFunction) => {

        service.findAll()
            .then(result => {
                baseController.sendResponse(result, req, res.status(200));
            })
            .catch(err => { baseController.sendResponse(err, req, res.status(200)); });

    }

    public create = (req: Request, res: Response, next: NextFunction) => {
        const item = req.body;
        item.id = uuidv4();
        service.create(item)
            .then(result => {
                baseController.sendResponse(result, req, res);
            })
            .catch(err => { res.json(err); });
    }

    public update = (req: Request, res: Response, next: NextFunction) => {
        const item = req.body;
        const id = req.params.id;
        item.id = id;
        service.update(id, item)
            .then(result => {
                baseController.sendResponse(result, req, res);
            })
            .catch(err => { res.json(err); });
    }

    public findOne = (req: Request, res: Response, next: NextFunction) => {
        const item = req.body;
        const id = req.params.id;
        service.findOne(id)
            .then(result => {
                baseController.sendResponse(result, req, res);
            })
            .catch(err => { res.json(err); });
    }
    public findItem = (req: Request, res: Response, next: NextFunction) => {
        const item = req.body;
        service.findItem(item)
            .then(result => {
                baseController.sendResponse(result, req, res);
            })
            .catch(err => { res.json(err); });

    }

    public delete = (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        service.delete(id)
            .then(result => {
                baseController.sendResponse(result, req, res);
            })
            .catch(err => { res.json(err); });

    }
}


