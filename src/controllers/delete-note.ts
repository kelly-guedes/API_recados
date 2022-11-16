import { Request, Response } from "express";
import { usersDB } from "../db/users";

export class DeleteNoteController {
  deleteNote(request: Request, response: Response) {
    const { userId, id } = request.params;

    const indexUser = usersDB.findIndex((user) => user.id === userId);

    const note = usersDB[indexUser].notes.find((note) => note.id === id);

    usersDB[indexUser].removeMote(id);

    return response
      .status(200)
      .json(`Nota:  ${note?.description},  excluída com sucesso!!`);
  }
}
