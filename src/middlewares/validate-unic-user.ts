import { NextFunction, Request, Response } from "express";
import { UserEntity } from "../database/entities/user-entity";
import { pgHelper } from "../database/pg-helper";

export class ValidateUnicUser {
  async unicUser(request: Request, response: Response, next: NextFunction) {
    const { email } = request.body;

    const manager = pgHelper.client.manager;

    const userFound = await manager.findOne(UserEntity, {
      where: {
        email: email,
      },
    });

    if (userFound) {
      return response.status(404).json({ message: "Usuário já cadastrado!" });
    }

    next();
  }
}
