import crypto from "crypto"

export class Note{
    private _id: string
    get id(): string {
        return this._id;
    }

    private _description: string
    get description(): string {
        return this._description;
    }

    private _archived: boolean
    get achived(): boolean {
        return this._archived
    }
    constructor(description: string){
        this._id = crypto.randomUUID();
        this._description = description;
        this._archived = false
    }


    updateInformation(description: string) {
        if (!description) throw new Error("Nota inválida");
    
        this._description = description;
      }


      changeStatus(statusNotes: boolean){
        this._archived = statusNotes
      }

    toJson(){
        return {
            id: this.id,
            description: this.description,
        }
    }

}