
import { Request, Response, NextFunction } from 'express';


export class BaseController {
    public sendResponse = (result?: any, req?: Request, res?: Response) => {
        return new Promise<void>((resolve, reject) => {
            if (res) {
                res.set('Cache-Control', 'no-cache,no-store');
                res.json(result)
            }
            resolve();
        });
    };
}