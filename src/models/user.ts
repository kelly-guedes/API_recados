import crypto from 'crypto'
import { Note } from './notes'

export class User {
    private _id: string
    get id(): string {
        return this._id;
    }

    private _name: string
    get name(): string {
        return this._name;
    }

    private _email: string
    get email(): string {
        return this._email;
    }

    private _password: string
    get password(): string {
        return this._password;
    }

    private _notes: Note[] = []
    get notes(): Note[]{
        return [...this._notes];
    }

    constructor(name: string, email: string, password: string){
        this._id = crypto.randomUUID();
        this._name = name;
        this._email = email;
        this._password = password;
    }

      
    newNotes(note: Note){
        this._notes.push(note);
    }

    toJson(){
        return {
        id: this.id,
        name: this.name,
        email: this.email,
        password: this.password,
        }
    }

    
}