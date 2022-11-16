import crypto from "crypto";
import { Note } from "./note";

export class User {
  private _id: string;
  get id(): string {
    return this._id;
  }

  private _name: string;
  get name(): string {
    return this._name;
  }

  private _email: string;
  get email(): string {
    return this._email;
  }

  private _password: string;
  get password(): string {
    return this._password;
  }

  private _notes: Note[];
  get notes(): Note[] {
    return [...this._notes];
  }

  constructor(name: string, email: string, password: string) {
    this._id = crypto.randomUUID();
    this._name = name;
    this._email = email;
    this._password = password;
    this._notes = [];
  }

  newNotes(note: Note) {
    this._notes.push(note);
  }

  removeMote(id: string) {
    const noteIndex = this._notes.findIndex((note) => note.id === id);

    this._notes.splice(noteIndex, 1);
  }

  updateNote(id: string, description: string) {
    const note = this._notes.find((note) => note.id === id);

    note?.updateInformation(description);
  }

  changeStatus(id: string, archived: boolean) {
    const note = this._notes.find((note) => note.id === id);

    note?.changeStatus(archived);
  }
  toJson() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
    };
  }
}
