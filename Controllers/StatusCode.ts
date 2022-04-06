
import { Request, Response, NextFunction, Application } from 'express';



export class StatusCode {
    public OK = (res: Response, rs?: any) => {
        if (!rs) {
            res.status(200).json({ message: "Sucsess" });
        }
        res.status(200).json(rs);
    }

    public PageNotFound = (res: Response) => {
        res.status(404).json("PageNotFound");
    }
    public Forbidden = (res: Response) => {
        res.status(403).json("Fobibden");
    }
    public BadRequest = (res: Response) => {
        res.status(400).json("BadRequest");
    }
    public ServerError = (res: Response) => {
        res.status(500).json("ServerError");
    }


}