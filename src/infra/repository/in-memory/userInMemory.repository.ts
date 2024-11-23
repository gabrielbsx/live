import { UserEntity } from "@/core/entity/user.entity";
import { UserRepository } from "@/core/repository/user.repository";
import { UserModel } from "./models/user.model";
import { randomUUID } from "crypto";

export class UserInMemoryRepository implements UserRepository {
  static User: UserModel[] = [];

  async create(data: UserEntity): Promise<UserEntity> {
    const { user, audit } = data;

    const userCreationMapped = {
      ...user,
      ...audit,
      id: randomUUID(),
      createdAt: new Date(),
      createdBy: audit.createdBy!,
    };

    UserInMemoryRepository.User.push({
      ...userCreationMapped,
    });

    const userCreatedMapped = new UserEntity({
      ...userCreationMapped,
    });

    return userCreatedMapped;
  }

  async update(_data: UserEntity): Promise<UserEntity> {
    throw new Error("It's not implemented yet!");
  }

  async delete(_data: UserEntity): Promise<UserEntity> {
    throw new Error("It's not implemented yet!");
  }

  async findById(_id: string): Promise<UserEntity> {
    throw new Error("It's not implemented yet!");
  }

  async findByParams(_params: UserEntity): Promise<UserEntity> {
    throw new Error("It's not implemented yet!");
  }
}
