import { UsersService } from '../Services/Users'
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { StatusCode } from './StatusCode';
import { BaseController } from './BaseController';

const statusCode = new StatusCode();
const service = new UsersService();
const baseController = new BaseController();

export class UsersController extends BaseController {


    public findAll = async (req: Request, res: Response, next: NextFunction) => {
        const result = await service.findAll();
        this.sendResponse(result, req, res);
    }

    public create = async (req: Request, res: Response, next: NextFunction) => {
        const item = req.body;
        item.uuid = uuidv4();
        const result = await service.create(item);
        this.sendResponse(result, req, res);
    }

    public update = async (req: Request, res: Response, next: NextFunction) => {
        const item = req.body;
        const id = item.id;
        const result = await service.update(id, item);
        baseController.sendResponse(result, req, res);
    }

    public findOne = async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        const result = await service.findOne(id);
        this.sendResponse(result, req, res);
    }
    public findItem = async (req: Request, res: Response, next: NextFunction) => {
        const item = req.body;
        const result = await service.findItem(item);
        baseController.sendResponse(result, req, res);

    }

    public delete = async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        const result = await service.delete(id);
        this.sendResponse(result, req, res);

    }
    public selectAcount = async (req: Request, res: Response, next: NextFunction) => {
        const username = req.body.username
        const password = req.body.password
        const result = await service.selectAcount(username, password);
        this.sendResponse(result, req, res)

    }
}


