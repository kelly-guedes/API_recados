import { Express } from "express";
import { CreateNoteController } from "./controllers/note.controller";
import { UserController } from "./controllers/user.controller";
import { ValidateUserMiddleware } from "./middlewares/validade-users";
import { ValidateLoginMiddleware } from "./middlewares/validate-login";
import { ValidatePasswordRegexMiddleware } from "./middlewares/validate-password-regex";
import { ValidateRepeatPassMiddleware } from "./middlewares/validate-repeat-pass";
import { ValidateUnicUser } from "./middlewares/validate-unic-user";
import { ValidateUserIdSizeMiddware } from "./middlewares/validate-userId-size";
import { VerifyArchivedParamsMiddleware } from "./middlewares/verify-archived-params";
import { VeriIdNotesMiddleware } from "./middlewares/verify-Id-Notes";
import { VerifyUserNotesMiddleware } from "./middlewares/verify-user-notes";

export default (app: Express) => {
  app.get("/", (request, response) => {
    return response.send("OK");
  });

  app.post(
    "/users",
    new ValidateUserMiddleware().validateUser,
    new ValidatePasswordRegexMiddleware().validatePasswordRegex,
    new ValidateRepeatPassMiddleware().validateRepeatPass,
    new ValidateUnicUser().unicUser,
    new UserController().createUser
  );

  app.get("/users", new UserController().getAllUsers);

  app.post(
    "/users/login",
    new ValidateLoginMiddleware().validateLogin,
    new ValidatePasswordRegexMiddleware().validatePasswordRegex,
    new UserController().verifyLogin
  );

  app.post(
    "/user/:userId/notes",
    new ValidateUserIdSizeMiddware().verifySizeUUID,
    new VerifyUserNotesMiddleware().verifyUserNotes,
    new CreateNoteController().createNewNote
  );

  app.get(
    "/user/:userId/notes",
    new ValidateUserIdSizeMiddware().verifySizeUUID,
    new VerifyUserNotesMiddleware().verifyUserNotes,
    new CreateNoteController().getAllNotes
  );

  // app.get(
  //   "/user/:userId/notes/:id",
  //    new ValidateUserIdSizeMiddware().verifySizeUUID,
  //   new VerifyUserNotesMiddleware().verifyUserNotes,
  //   new VeriIdNotesMiddleware().verifyIdNotes,
  //   new GetNoteByIdController().getNoteById
  // );

  // app.delete(
  //   "/user/:userId/notes/:id",
  //   new VerifyUserNotesMiddleware().verifyUserNotes,
  //   new VeriIdNotesMiddleware().verifyIdNotes,
  //   new DeleteNoteController().deleteNote
  // );

  // app.put(
  //   "/user/:userId/notes/:id",
  //   new VerifyUserNotesMiddleware().verifyUserNotes,
  //   new VeriIdNotesMiddleware().verifyIdNotes,
  //   new UpdateNoteController().updateNote
  // );

  // app.put(
  //   "/user/:userId/notes/:id/archived",
  //   new VerifyUserNotesMiddleware().verifyUserNotes,
  //   new VeriIdNotesMiddleware().verifyIdNotes,
  //   new VerifyArchivedParamsMiddleware().verifyArchivedParams,
  //   new ChangeStatusNotesController().change
  // );
};
