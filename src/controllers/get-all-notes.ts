import { Request, Response } from "express";
import { usersDB } from "../db/users";

export class GetAllNotesController {
  getAllNotes(request: Request, response: Response) {
    const { userId } = request.params;

    const { description, archived } = request.query;

    const user = usersDB.find((user) => user.id === userId);

    let notes = user?.notes.filter((note) => {
      let filterDescription = true;
      let filterArchived = true;

      if (description) {
        filterDescription = note.description
          .toLocaleLowerCase()
          .includes(description.toString().toLocaleLowerCase());
      }
      if (archived) {
        filterArchived = note.achived === (archived === "true" ? true : false);
      }
      return filterArchived && filterDescription;
    });

    const data = {
      recados: notes?.map((n) => n.toJson()),
    };

    return response.json(data);
  }
}
