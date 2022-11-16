import { Request, Response } from "express";
import { usersDB } from "../db/users";
import { Note } from "../models/note";

export class CreateNoteController {
  create(request: Request, response: Response) {
    const { description } = request.body;

    const { userId } = request.params;

    const note = new Note(description);

    const user = usersDB.find((user) => user.id === userId);

    user?.newNotes(note);

    return response.json(note.toJson());
  }
}
