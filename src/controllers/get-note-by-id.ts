import { Request, Response } from "express";
import { usersDB } from "../db/users";

export class GetNoteByIdController {
  getNoteById(request: Request, response: Response) {
    const { userId, id } = request.params;

    const userIndex = usersDB.findIndex((user) => user.id === userId);

    let note = usersDB[userIndex].notes.find((note) => note.id === id);

    return response.json(note?.toJson());
  }
}
