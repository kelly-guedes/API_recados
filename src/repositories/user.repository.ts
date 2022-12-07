import { json } from "stream/consumers";
import { UserEntity } from "../database/entities/user-entity";
import { pgHelper } from "../database/pg-helper";
import { User } from "../models/user";

export default class UserRepository {
  async createUser(user: User): Promise<void> {
    const manager = pgHelper.client.manager;
    const userEntity = manager.create(UserEntity, {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    });
    await manager.save(userEntity);
  }

  async validateLogin(inputs: { email: string; password: string }) {
    const manager = pgHelper.client.manager;
    const userEntity = await manager.findOneOrFail(UserEntity, {
      where: {
        email: inputs.email,
        password: inputs.password,
      },
      relations: {
        noteEntities: true,
      },
    });
    return userEntity;
  }

  async getAllUser(): Promise<UserEntity[]> {
    const manager = pgHelper.client.manager;

    const userEntity: UserEntity[] = await manager.find(UserEntity);
    return userEntity;
  }

  async getUserById(userId: string): Promise<UserEntity> {
    const manager = pgHelper.client.manager;

    const userEntity = (await manager.findOneBy(UserEntity, {
      id: userId,
    })) as UserEntity;

    return userEntity;
  }

  async removeUser(userId: string): Promise<void> {
    const manager = pgHelper.client.manager;
    await manager.delete(UserEntity, { id: userId });
  }

  async updateUser(user: User, userId: string) {
    const manager = pgHelper.client.manager;
    const userEntity = manager.create(UserEntity, {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    });

    await manager.save(userEntity);
  }
}
