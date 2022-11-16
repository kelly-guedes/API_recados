import { Request, Response, NextFunction } from "express";
import { usersDB } from "../db/users";

export class VeriIdNotesMiddleware {
  verifyIdNotes(request: Request, response: Response, next: NextFunction) {
    const { userId, id } = request.params;

    const indexUser = usersDB.findIndex((user) => user.id === userId);

    const note = usersDB[indexUser].notes.find((note) => note.id === id);

    if (!note) {
      return response.status(404).json({ message: "Recado não encontrado." });
    }

    next();
  }
}
