import { StaticticalService } from '../Services/Statistical'
import { Request, Response, NextFunction } from 'express';
import { TokenService } from '../Services/Token'
import { BaseController } from './BaseController';

const service = new StaticticalService();
const baseController = new BaseController();
const tokenService = new TokenService();
export class StatisticalController {

    public findServiceMost = async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers["authorization"]?.split(" ")[1];
        const HotelId = await tokenService.findHotelIdWhereToken(token);
        const month = req.params.month;
        const year = req.params.year;
        service.findServiceMost(month,year,  HotelId)
        .then(result => {
            baseController.sendResponse(result, req, res);
        })
        .catch(err => { baseController.sendResponse(err, req, res.status(500)); });
}

    
}
