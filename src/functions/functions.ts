import { Response, Request } from "express";

function hdSegWit(req: Request, res: Response){
    res.json({
        "result":""
    });
}

function multisig(req: Request, res: Response){
    res.json({
        "result":""
    });
}

export {hdSegWit, multisig}