import { Request, Response } from "express";
import { usersDB } from "../db/users";
import { Note } from "../models/note";
import NotesRepository from "../repositories/note.repository";

export class CreateNoteController {
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

  getNoteById(request: Request, response: Response) {
    const { userId, id } = request.params;

    const userIndex = usersDB.findIndex((user) => user.id === userId);

    let note = usersDB[userIndex].notes.find((note) => note.id === id);

    return response.json(note?.toJson());
  }

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
  change(request: Request, response: Response) {
    const { userId, id } = request.params;

    const { archived } = request.body;

    const noteFound = usersDB.find((note) => id === note.id);

    noteFound?.changeStatus(id, archived);
    return response.status(200).json(noteFound);
  }
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
