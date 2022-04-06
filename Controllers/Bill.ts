import { BillService } from '../Services/Bill'
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { StatusCode } from './StatusCode';
const statusCode = new StatusCode();

const service = new BillService();

export class BillController {

    public findAll = async (req: Request, res: Response, next: NextFunction) => {
        const result = await service.findAll();
        statusCode.OK(res, result);
    }

    public create = async (req: Request, res: Response, next: NextFunction) => {
        const item = req.body;
        item.id = uuidv4();
        await service.create(item);
        statusCode.OK(res);
    }

    public update = async (req: Request, res: Response, next: NextFunction) => {
        const item = req.body;
        const id = item.id;
        await service.update(id, item);
        statusCode.OK(res);
    }

    public findOne = async (req: Request, res: Response, next: NextFunction) => {
        const item = req.body;
        const id = item.id;
        const result = await service.findOne(id);
        statusCode.OK(res);
    }
    public findItem = async (req: Request, res: Response, next: NextFunction) => {
        const item = req.body;
        const result = await service.findItem(item);
        statusCode.OK(res);

    }

    public delete = async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        const rs = await service.delete(id);
        statusCode.OK(res);

    }

}
