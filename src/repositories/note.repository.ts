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

  async update(userId: string, id: string, description: string) {
    const manager = pgHelper.client.manager;

    await manager.update(
      NoteEntity,
      { id },
      { description, updateAt: new Date() }
    );

    const noteEntity = manager.findOne(NoteEntity, {
      where: {
        id,
      },
    });

    return noteEntity;
  }

  async renoveNote(id: string) {
    const manager = pgHelper.client.manager;

    const noteEntity = manager.findOne(NoteEntity, {
      where: {
        id,
      },
    });

    await manager.delete(NoteEntity, { id });
    return noteEntity;
  }

  async changeArchived(id: string, archived: boolean) {
    const manager = pgHelper.client.manager;

    await manager.update(NoteEntity, { id }, { archived });

    const noteEntity = manager.findOne(NoteEntity, {
      where: {
        id,
      },
    });
    return noteEntity;
  }
}
