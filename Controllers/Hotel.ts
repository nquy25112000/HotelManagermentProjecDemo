import { HotelService } from '../Services/Hotel'
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { StatusCode } from './StatusCode';
const statusCode = new StatusCode();
const service = new HotelService();


export class HotelController {


    public findAll = async (req: Request, res: Response, next: NextFunction) => {
        const result = await service.findAll();
        statusCode.OK(res, result);
    }

    public create = async (req: Request, res: Response, next: NextFunction) => {
        const item = req.body;
        item.uuid = uuidv4();
        await service.create(item);
        statusCode.OK(res);
    }

    public update = async (req: Request, res: Response, next: NextFunction) => {
        const item = req.body;
        const id = item.uuid;
        await service.update(id, item);
        statusCode.OK(res);
    }

    public findOne = async (req: Request, res: Response, next: NextFunction) => {
        const item = req.body;
        const id = item.uuid;
        const result = await service.findOne(id);
        statusCode.OK(res);
    }
    public findItem = async (req: Request, res: Response, next: NextFunction) => {
        const item = req.body;
        const result = await service.findItem(item);
        statusCode.OK(res);

    }

    public delete = async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.uuid;
        const rs = await service.delete(id);
        statusCode.OK(res);

    }
}


