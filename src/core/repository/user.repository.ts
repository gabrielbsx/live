import { Repository } from "../contracts/repository.contract";
import { UserModel } from "../models/user.model";

export interface UserRepository extends Repository<UserModel, string> {}
