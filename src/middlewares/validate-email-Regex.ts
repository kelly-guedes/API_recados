import { NextFunction, Request, Response} from "express";

export class ValidateEmailRegexMiddleware {
    validateEmailRegex (request: Request, response: Response, next: NextFunction){
        const {email} = request.body;
     
        
        const regexEmail = new RegExp("/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i")
        if (!regexEmail.test(email)) return response.status(400).json({error: "Email inválido"})
       
        next()
    }}






