import { NoteController } from "./controllers/note.controller";
import { UserController } from "./controllers/user.controller";
import { ValidateUserMiddleware } from "./middlewares/validade-users";
import { ValidateLoginMiddleware } from "./middlewares/validate-login";
import { ValidatePasswordRegexMiddleware } from "./middlewares/validate-password-regex";
import { ValidateRepeatPassMiddleware } from "./middlewares/validate-repeat-pass";
import { ValidateUnicUser } from "./middlewares/validate-unic-user";
import { ValidateUserIdSizeMiddware } from "./middlewares/validate-Id-size";
import { VeriIdNotesMiddleware } from "./middlewares/verify-Id-Notes";
import { VerifyUserNotesMiddleware } from "./middlewares/verify-user-notes";
import { VerifyArchivedParamsMiddleware } from "./middlewares/verify-archived-params";

export default (app: Express) => {
  app.get("/", (request, response) => {
    return response.send("OK");
  });

  const userController = new UserController();
  const noteController = new NoteController();

  app.post(
    "/users",
    new ValidateUserMiddleware().validateUser,
    new ValidatePasswordRegexMiddleware().validatePasswordRegex,
    new ValidateRepeatPassMiddleware().validateRepeatPass,
    new ValidateUnicUser().unicUser,
    userController.createUser
  );

  app.post(
    "/users/login",
    new ValidateLoginMiddleware().validateLogin,
    new ValidatePasswordRegexMiddleware().validatePasswordRegex,
    userController.verifyLogin
  );

  app.post(
    "/user/:userId/notes",
    new ValidateUserIdSizeMiddware().verifySizeUUIDUser,
    new VerifyUserNotesMiddleware().verifyUserNotes,
    noteController.createNewNote
  );

  app.get(
    "/user/:userId/notes",
    new ValidateUserIdSizeMiddware().verifySizeUUIDUser,
    new VerifyUserNotesMiddleware().verifyUserNotes,
    noteController.getAllNotes
  );

  app.delete(
    "/user/:userId/notes/:id",
    new ValidateUserIdSizeMiddware().verifySizeUUIDUser,
    new ValidateUserIdSizeMiddware().verifySizeUUIDNote,
    new VerifyUserNotesMiddleware().verifyUserNotes,
    new VeriIdNotesMiddleware().verifyIdNotes,
    noteController.deleteNote
  );

  app.put(
    "/user/:userId/notes/:id",
    new ValidateUserIdSizeMiddware().verifySizeUUIDUser,
    new ValidateUserIdSizeMiddware().verifySizeUUIDNote,
    new VerifyUserNotesMiddleware().verifyUserNotes,
    new VeriIdNotesMiddleware().verifyIdNotes,
    noteController.updateNote
  );

  app.put(
    "/user/:userId/notes/:id/archived",
    new VerifyUserNotesMiddleware().verifyUserNotes,
    new VeriIdNotesMiddleware().verifyIdNotes,
    new VerifyArchivedParamsMiddleware().verifyArchivedParams,
    noteController.change
  );
};
