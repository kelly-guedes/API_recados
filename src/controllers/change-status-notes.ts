import {Request, Response} from "express"
import { usersDB } from "../db/users";


export class ChangeStatusNotesController {
 change(request:Request, response:Response){
   
    const { userId, id } = request.params;

    const {archived} = request.body;

   const user = usersDB.find(user => userId === user.id)
   const noteFound = user?.notes.find(note => id === note.id)

   noteFound?.changeStatus(archived)
   return response.status(200).json(noteFound)
 }
}