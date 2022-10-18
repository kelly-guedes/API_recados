import { NextFunction, Request, Response} from "express";

export class ValidateRepeatPassMiddleware {
    validateRepeatPass (request: Request, response: Response, next: NextFunction){
        const {password, repeatPass} = request.body;

        
        if(password !== repeatPass){
            return response.status(400).json({error: "Senhas não conferem"})
        }

        next()
    }}