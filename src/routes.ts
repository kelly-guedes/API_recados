import { Express } from "express";
import { ChangeStatusNotesController } from "./controllers/change-status-notes";
import { CreateNoteController } from "./controllers/create-notes";
import { CreateUserController } from "./controllers/create-users";
import { DeleteNoteController } from "./controllers/delete-note";
import { GetAllNotesController } from "./controllers/get-all-notes";
import { GetNoteByIdController } from "./controllers/get-note-by-id";
import { LoginController } from "./controllers/login";
import { UpdateNoteController } from "./controllers/update-note";
import { ValidateUserMiddleware } from "./middlewares/validade-users";
import { ValidateEmailRegexMiddleware } from "./middlewares/validate-email-Regex";
import { ValidateLoginMiddleware } from "./middlewares/validate-login";
import { ValidatePasswordRegexMiddleware } from "./middlewares/validate-password-regex";
import { ValidateRepeatPassMiddleware } from "./middlewares/validate-repeat-pass";
import { ValidateSizeUserMiddleware } from "./middlewares/validate-size-user";
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
    new ValidateSizeUserMiddleware().validateSizeUser,
    // new ValidateEmailRegexMiddleware().validateEmailRegex,
    new ValidatePasswordRegexMiddleware().validatePasswordRegex,
    new ValidateRepeatPassMiddleware().validateRepeatPass,
    new CreateUserController().create
  );

  app.post(
    "/users/login",
    new ValidateLoginMiddleware().validateLogin,
    new ValidatePasswordRegexMiddleware().validatePasswordRegex,
    new LoginController().verifyLogin
  );

  app.post(
    "/user/:userId/notes",
    new VerifyUserNotesMiddleware().verifyUserNotes,
    new CreateNoteController().create
  );

  app.get(
    "/user/:userId/notes",
    new VerifyUserNotesMiddleware().verifyUserNotes,
    new GetAllNotesController().getAllNotes
  );

  app.get(
    "/user/:userId/notes/:id",
    new VerifyUserNotesMiddleware().verifyUserNotes,
    new VeriIdNotesMiddleware().verifyIdNotes,
    new GetNoteByIdController().getNoteById
  );

  app.delete(
    "/user/:userId/notes/:id",
    new VerifyUserNotesMiddleware().verifyUserNotes,
    new VeriIdNotesMiddleware().verifyIdNotes,
    new DeleteNoteController().deleteNote
  );

  app.put(
    "/user/:userId/notes/:id",
    new VerifyUserNotesMiddleware().verifyUserNotes,
    new VeriIdNotesMiddleware().verifyIdNotes,
    new UpdateNoteController().updateNote
  );

  app.put(
    "/user/:userId/notes/:id/archived",
    new VerifyUserNotesMiddleware().verifyUserNotes,
    new VeriIdNotesMiddleware().verifyIdNotes,
    new VerifyArchivedParamsMiddleware().verifyArchivedParams,
    new ChangeStatusNotesController().change
  );
};
