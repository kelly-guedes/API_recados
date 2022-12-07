import { FindOperator, Like } from "typeorm";
import { NoteEntity } from "../database/entities/note-entity";
import { pgHelper } from "../database/pg-helper";
import { Note } from "../models/note";

export default class NotesRepository {
  async createNote(id: string, note: Note) {
    const manager = pgHelper.client.manager;

    const noteEntity = manager.create(NoteEntity, {
      id: note.id,
      description: note.description,
      userID: id,
    });
    await manager.save(noteEntity);
  }

  async getAllNotesUserId(
    id_user: string,
    description?: string,
    archived?: string
  ) {
    const manager = pgHelper.client.manager;

    let filter: {
      id_user: string;
      description?: FindOperator<string>;
      archived?: boolean;
    } = { id_user };

    if (archived) {
      filter = {
        ...filter,
        archived: archived === "true" ? true : false,
      };
    }
    if (description) {
      filter = {
        ...filter,
        description: Like(`%${description}%`),
      };
    }

    const notesEntities = await manager.find(NoteEntity, {
      where: filter,
      select: {
        description: true,
        archived: true,
        id: true,
      },
    });
    return notesEntities;
  }
}
