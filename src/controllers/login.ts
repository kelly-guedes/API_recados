import {Request, Response } from "express";
import { usersDB } from "../db/users";


export class LoginController {
    verifyLogin(request: Request, response: Response){
                
        const {email, password} = request.body;
        
        const verifyUser = usersDB.find(user => user.email === email && user.password === password)

        console.log("===verifyuser===", verifyUser)
        if(!verifyUser){
            return response.status(404).json({error: "Usuário não encontrado."});
        }

        return response.json(verifyUser.toJson());
    }
}