import { Request, Response } from "express";
import { usersDB } from "../db/users";

export class ChangeStatusNotesController {
  change(request: Request, response: Response) {
    const { userId, id } = request.params;

    const { archived } = request.body;

    const noteFound = usersDB.find((note) => id === note.id);

    noteFound?.changeStatus(id, archived);
    return response.status(200).json(noteFound);
  }
}
