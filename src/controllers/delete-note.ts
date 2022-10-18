import {Request, Response} from "express"
import { usersDB } from "../db/users";


export class DeleteNoteController {
 deleteNote(request:Request, response:Response){
    const { userId, id } = request.params;
    
    const indexUser = usersDB.findIndex((user)=> user.id === userId);

    const note = usersDB[indexUser].notes
    .find(note => note.id === id )


    const noteIndex = usersDB[indexUser].notes
    .findIndex(note => note.id === id )

    if(indexUser < 0){
        return response.status(404).json({error: "Usuário não encontrado"})
    }
    if(noteIndex < 0){
        return response.status(404).json({error: "Nota não encontrada"})
    }

    usersDB[indexUser].notes.splice(noteIndex,1);


    return response.status(200).json(`Nota:  ${note?.description},  excluída com sucesso!!`);
 }
}