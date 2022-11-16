import { Request, Response } from "express";
import { usersDB } from "../db/users";

export class UpdateNoteController {
  updateNote(request: Request, response: Response) {
    const { userId, id } = request.params;

    const { description } = request.body;

    const userIndex = usersDB.findIndex((user) => user.id === userId);

    try {
      usersDB[userIndex]?.updateNote(id, description);
    } catch (err: any) {
      return response.status(400).json({ error: err.message });
    }

    return response.json("Nota atualizada com sucesso!");
  }
}
