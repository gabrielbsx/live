import { EntityMapper } from "../../../../core/contracts/common/entityMapper.contract";
import { UserEntity } from "../../../../core/entity/user.entity";
import { UserModel } from "../../../../core/models/user.model";

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
