import { UserModel } from "../models/user.model";
import { Repository } from "./repository.contract";

export interface UserRepository extends Repository<UserModel, string> {}
