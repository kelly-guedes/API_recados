import { NextFunction, Request, Response} from "express";

export class ValidatePasswordRegexMiddleware {
    validatePasswordRegex (request: Request, response: Response, next: NextFunction){
        const {password} = request.body;
     
        
        const regex = new RegExp("^(?=.*[A-Z])(?=.*[!#@$%&])(?=.*[0-9])(?=.*[a-z]).{6,15}$")
        if (!regex.test(password)) return response.status(400).json({error: "Sua senha deve conter no mínimo 6 dígitos e no máximo 15, deve conter no mínimo uma letra maiúscula, uma mínúscula, um número e um caracter especial."})
       
        next()
    }}