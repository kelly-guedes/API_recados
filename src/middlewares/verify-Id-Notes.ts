import { Request, Response, NextFunction } from "express";
import { NoteEntity } from "../database/entities/note-entity";
import { pgHelper } from "../database/pg-helper";

export class VeriIdNotesMiddleware {
  async verifyIdNotes(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { id } = request.params;

    const manager = pgHelper.client.manager;

    const noteFound = await manager.findOne(NoteEntity, {
      where: {
        id: id,
      },
    });

    if (!noteFound) {
      return response.status(404).json({ message: "Recado não encontrado." });
    }

    next();
  }
}
