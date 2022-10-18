import { Request, Response } from "express";
import { usersDB } from "../db/users";
import { Note } from "../models/notes";


export class CreateNoteController {
    create(request: Request, response: Response) {
        const { description } = request.body;
  
        const {userId} = request.params

        const note = new Note( description );

        const user = usersDB.find(user => user.id === userId)
            
        if (!user) {
            return response.status(404).json({ error: "Growdever não encontrado" });
        }
        
        try { 
            user.newNotes(note);
  
        } catch (error: any) {
            return response.status(400).json({ error: error.message });
        }
  
        return response.json(note.toJson())

    }
  }