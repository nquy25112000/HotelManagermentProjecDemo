import { TokenService } from "../Services/Token";
import { Request, Response, NextFunction } from 'express';
import { BaseController } from "./BaseController";
const service = new TokenService();



export class TokenController extends BaseController {

    public createToken = async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.user;
        try {
            const result = await service.createToken(userId);
            this.sendResponse(result, req, res)
        }
        catch (err) {
            res.json(err);
        }
    }

    public authorization = (req: Request, res: Response, next: NextFunction) => {
        let author = req.headers['authorization'];
        const token = author?.split(" ")[1];
        service.checkToken(token)
            .then(result => {
                if (result) {
                    const time = result[0].timeExpire;
                    service.checkTimeToken(time)
                        .then(() => {
                            next();
                        })
                        .catch(err => { res.json(err) })
                }
            })
            .catch(err => { res.json(err) })
    }

    public RoleRoot = (req: Request, res: Response, next: NextFunction) => {
        const author = req.headers['authorization'];
        const token = author?.split(" ")[1];
        service.checkRoleToken(token)
            .then(() => {
                next();
            })
            .catch((err) => {
                res.json(err)
            })

    }

}