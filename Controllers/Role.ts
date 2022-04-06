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


    public findAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await service.findAll();
            baseController.sendResponse(result, req, res);
        }
        catch (err) {
            err
        }

        ///anh yeu em

    }

    public create = async (req: Request, res: Response, next: NextFunction) => {
        const item = req.body;
        item.uuid = uuidv4();
        const result = await service.create(item);
        baseController.sendResponse(result, req, res);
    }

    public update = async (req: Request, res: Response, next: NextFunction) => {
        const item = req.body;
        const id = item.id;
        const result = await service.update(id, item);
        baseController.sendResponse(result, req, res);
    }

    public findOne = async (req: Request, res: Response, next: NextFunction) => {
        const item = req.body;
        const id = item.id;
        const result = await service.findOne(id);
        baseController.sendResponse(result, req, res);
    }
    public findItem = async (req: Request, res: Response, next: NextFunction) => {
        const item = req.body;
        const result = await service.findItem(item);
        baseController.sendResponse(result, req, res);

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


