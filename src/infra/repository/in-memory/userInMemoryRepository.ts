import { UserRepository } from "@/core/repositories/userRepository";
import { InMemoryRepository } from "./repoInMemoryRepository";
import { UserModel } from "@/core/models/userModel";

export class UserInMemoryRepository
  extends InMemoryRepository<UserModel>
  implements UserRepository
{
  constructor() {
    super("user");
  }
}
