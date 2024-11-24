import { UserModel } from "../models/userModel";
import { Repository } from "./repositoryContract";

export interface UserRepository extends Repository<UserModel, string> {}
