import { RoomService } from '../Services/Room'
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { StatusCode } from './StatusCode';
import { BaseController } from './BaseController';
const baseController = new BaseController();
const statusCode = new StatusCode();
const service = new RoomService();

export class RoomController{


    public findAll = (req: Request, res: Response, next: NextFunction) => {

        service.findAll()
        .then(result => {
            baseController.sendResponse(result, req, res);
        })
        .catch(err => { res.json(err); });



}

    public create =  (req: Request, res: Response, next: NextFunction) => {
        const item = req.body;
        item.id = uuidv4();
        service.create(item)
        .then(result => {
            baseController.sendResponse(result, req, res);
        })
        .catch(err => { res.json(err); });
    }

    public update =  (req: Request, res: Response, next: NextFunction) => {
        const item = req.body;
          const id = req.params.id;
          item.updatedAt = new Date();
        service.update(id, item)
        .then(result => {
            baseController.sendResponse(result, req, res);
        })
        .catch(err => { res.json(err); });
    }

    public findOne =  (req: Request, res: Response, next: NextFunction) => {
        const item = req.body;
          const id = req.params.id;
        service.findOne(id)
        .then(result => {
            baseController.sendResponse(result, req, res);
        })
        .catch(err => { res.json(err); });
    }
    public findItem =  (req: Request, res: Response, next: NextFunction) => {
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


