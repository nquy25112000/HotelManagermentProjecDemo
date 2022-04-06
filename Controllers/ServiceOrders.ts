import { ServiceOrdersService } from '../Services/ServiceOrders'
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { StatusCode } from './StatusCode';
import { BaseController } from './BaseController';
const baseController = new BaseController();
const statusCode = new StatusCode();
const service = new ServiceOrdersService();

export class ServiceOrdersController {


    public findAll = (req: Request, res: Response, next: NextFunction) => {

        service.findAll()
        .then(result => {
            baseController.sendResponse(result, req, res);
        })
        .catch(err => { res.json(err); });



}

    public create =  (req: Request, res: Response, next: NextFunction) => {
        const item = req.body;
        // console.log(item);
        // var a : any = [];
        // for (let i = 0 ; i < item.order.length ; i ++ ){
        //     item.order[i].id = uuidv4();
        //     a.push(item.order[i])
        //     console.log(item.order[i]);
        // }
        // item.id = uuidv4();
        // const item : any   = [{id : 4 ,bookRoomId: "f7c2f505-4fe4-4638-9080-d796844703b8",serviceId	: "1ba4e639-4bb9-47f2-8ca7-718da582c48f", number :  2},{id : 3 ,bookRoomId: "f7c2f505-4fe4-4638-9080-d796844703b8",serviceId	: "1ba4e639-4bb9-47f2-8ca7-718da582c48f", number :  4}] ;
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


