import { BillService } from '../Services/Bill'
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { StatusCode } from './StatusCode';
const statusCode = new StatusCode();
import { BaseController } from './BaseController';
import { TokenService } from '../Services/Token'

const tokenService = new TokenService();
const baseController = new BaseController();
const service = new BillService();

export class BillController {

    public findAll = async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers["authorization"]?.split(" ")[1];
        const HotelId = await tokenService.findHotelIdWhereToken(token);
        service.findAll(HotelId)
        .then(result => {
            baseController.sendResponse(result, req, res);
        })
        .catch(err => { baseController.sendResponse(err, req, res.status(500)); });
}

    public create = async  (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers["authorization"]?.split(" ")[1];
        const HotelId = await tokenService.findHotelIdWhereToken(token);
        const item = req.body;
        item.id = uuidv4();
        service.create(item ,HotelId )
        .then(result => {
            baseController.sendResponse(result, req, res);
        })
        .catch(err => { baseController.sendResponse(err, req, res.status(500)); });
    }

    public update =  (req: Request, res: Response, next: NextFunction) => {
        const item = req.body;
        const id = req.params.id;
        item.updatedAt = new Date();
        service.update(id, item)
        .then(result => {
            baseController.sendResponse(result, req, res);
        })
        .catch(err => { baseController.sendResponse(err, req, res.status(500)); });
    }

    public getTotalBill  = async  (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers["authorization"]?.split(" ")[1];
        const HotelId = await tokenService.findHotelIdWhereToken(token);
        const id = req.params.id;
        service.getTotalBill(id, HotelId)
        .then(result => {
            baseController.sendResponse(result, req, res);
        })
        .catch(err => { baseController.sendResponse(err, req, res.status(500)); });
    }

    public findOne = async  (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers["authorization"]?.split(" ")[1];
        const HotelId = await tokenService.findHotelIdWhereToken(token);
        const item = req.body;
        const id = req.params.id;
        service.findOne(id, HotelId)
        .then(result => {
            baseController.sendResponse(result, req, res);
        })
        .catch(err => { baseController.sendResponse(err, req, res.status(500)); });
    }
    public findItem =  (req: Request, res: Response, next: NextFunction) => {
        const item = req.body;
        service.findItem(item)
        .then(result => {
            baseController.sendResponse(result, req, res);
        })
        .catch(err => { baseController.sendResponse(err, req, res.status(500)); });

    }

    public delete = (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        service.delete(id)
            .then(result => {
                baseController.sendResponse(result, req, res);
            })
            .catch(err => { baseController.sendResponse(err, req, res.status(500)); });

    }
}
