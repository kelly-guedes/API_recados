import { Request, Response } from "express";
import { User } from "../models/user";
import UserRepository from "../repositories/user.repository";

export class UserController {
  async createUser(request: Request, response: Response) {
    const { name, email, password } = request.body;

    const user = new User(name, email, password);

    const repository = new UserRepository();

    await repository.createUser(user);

    return response.json(user.toJson());
  }

  async verifyLogin(request: Request, response: Response) {
    const { email, password } = request.body;

    const inputsEmailPassword = { email, password };
    const repository = new UserRepository();

    try {
      const user = await repository.validateLogin(inputsEmailPassword);
      return response.json(user);
    } catch (error: any) {
      return response.status(401).json({ error: "Email ou senha inválidos." });
    }
  }

  async getAllUsers(request: Request, response: Response) {
    const { name, email } = request.query;

    const repository = new UserRepository();
    let users = await repository.getAllUser();

    if (name) {
      users = users.filter((user) => {
        return user.name.toLowerCase().includes(name.toString().toLowerCase());
      });
      return response.json(users);
    }

    if (email) {
      users = users.filter((user) => {
        return user.email
          .toLowerCase()
          .includes(email.toString().toLowerCase());
      });
      return response.json(users);
    }

    return response.json(users);
  }

  // async getUserById(request: Request, response: Response) {
  //   const { id } = request.params;

  //   const repository = new UserRepository();

  //   const user = await repository.getUserById;

  //   if (!user) {
  //     return response.status(401).json({ error: "Usuário ou senha inválidos" });
  //   }
  //   return response.json(user);
  // }

  // async remove(request: Request, response: Response) {
  //   const { userId } = request.params;
  //   const repository = new UserRepository();

  //   await repository.removeUser(userId);

  //   return response.json({ msg: "user deleted" });
  // }
}
