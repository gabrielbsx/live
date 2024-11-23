import { Repository } from "../contracts/repository.contract";
import { UserEntity } from "../entity/user.entity";

export interface UserRepository extends Repository<UserEntity, string> {}
