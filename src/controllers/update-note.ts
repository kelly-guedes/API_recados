import { Request, Response } from "express";
import { usersDB } from "../db/users";

export class UpdateNoteController {
  updateNote(request: Request, response: Response) {
    const { userId, id } = request.params;

    const { description } = request.body;

    const userIndex = usersDB.findIndex(user => user.id === userId)
      
      const note = usersDB[userIndex].notes
      .find((note)=> note.id === id)
    
        if (!note) {
            return response.status(404).json({ error: "Nota não localizada" });
          }
      
        try {
            note.updateInformation(description);
        } catch (err: any) {
            return response.status(400).json({ error: err.message });
        }

      return response.json(note)
  }
}