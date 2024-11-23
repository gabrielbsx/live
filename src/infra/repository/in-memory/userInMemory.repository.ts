import { UserRepository } from "@/core/repositories/user.repository";
import { InMemoryRepository } from "./repoInMemory.repository";
import { UserModel } from "@/core/models/user.model";

export class UserInMemoryRepository
  extends InMemoryRepository<UserModel>
  implements UserRepository
{
  constructor() {
    super("user");
  }
}
