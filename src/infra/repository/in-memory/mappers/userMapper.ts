import { EntityMapper } from "@/core/contracts/common/entityMapperContract";
import { UserEntity } from "@/core/entity/userEntity";
import { UserModel } from "@/core/models/userModel";

export class UserMapper implements EntityMapper<UserEntity, UserModel> {
  async toData(entity: UserEntity): Promise<UserModel> {
    const { user, audit } = entity;

    const userModel: UserModel = {
      ...user,
      ...audit,
      id: audit.id!,
      createdBy: audit.createdBy!,
      createdAt: audit.createdAt!,
    };

    return userModel;
  }

  async toEntity(data: UserModel): Promise<UserEntity> {
    const userEntity = new UserEntity(data);

    return userEntity;
  }
}
