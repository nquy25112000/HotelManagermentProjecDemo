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
    public authorization = async (req: Request, res: Response, next: NextFunction) => {
        let author = req.headers['authorization'];
        const token = author?.split(" ")[1];
        try {
            await service.checkToken(token);
            next();
        } catch (error) {
            res.status(401).json(error)
        }

    }

    public RoleRoot = (req: Request, res: Response, next: NextFunction) => {
        const author = req.headers['authorization'];
        const token = author?.split(" ")[1];
        service.RoleRoot(token)
            .then(() => {
                next();
            })
            .catch((err) => {
                res.status(403).json(err)
            })

    }
    public RoleAdmin = (req: Request, res: Response, next: NextFunction) => {
        const author = req.headers['authorization'];
        const token = author?.split(" ")[1];
        service.RoleAdmin(token)
            .then(() => {
                next();
            })
            .catch((err) => {
                res.status(403).json(err)
            })
    }

    public RoleAdminAndUser = (req: Request, res: Response, next: NextFunction) => {
        const author = req.headers['authorization'];
        const token = author?.split(" ")[1];
        service.RoleAdminAndUser(token)
            .then(() => {
                next();
            })
            .catch((err) => {
                res.status(403).json(err)
            })

    }

}