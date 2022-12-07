import { Request, Response } from "express";
import { usersDB } from "../db/users";
import { Note } from "../models/note";
import NotesRepository from "../repositories/note.repository";

export class NoteController {
  async createNewNote(request: Request, response: Response) {
    const { description } = request.body;

    const { userId } = request.params;

    const newNote = new Note(description);

    const repository = new NotesRepository();

    await repository.createNote(userId, newNote);

    return response.json(newNote.toJson());
  }

  async getAllNotes(request: Request, response: Response) {
    const { userId } = request.params;

    const { description, archived } = request.query;

    const repository = new NotesRepository();

    const notesUser = await repository.getAllNotesUserId(
      userId,
      description as string,
      archived as string
    );
    return response.json(notesUser);
  }

  async updateNote(request: Request, response: Response) {
    const { userId, id } = request.params;

    const { description } = request.body;

    const repository = new NotesRepository();
    const note = await repository.update(userId, id, description);

    return response.json(note);
  }
  async change(request: Request, response: Response) {
    const { id } = request.params;

    const { archived } = request.body;

    const repository = new NotesRepository();

    const note = await repository.changeArchived(id, archived);

    return response.status(200).json(note);
  }
  async deleteNote(request: Request, response: Response) {
    const { id } = request.params;

    const repository = new NotesRepository();
    const note = await repository.renoveNote(id);
    return response
      .status(200)
      .json(`Nota:  ${note?.description},  excluída com sucesso!!`);
  }
}
