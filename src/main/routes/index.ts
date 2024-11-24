import { createRouter, Result } from "aeria";
import { UserFactory } from "@/main/factories/userFactory";
import { UserCreationInput } from "@/app/users/dtos/userDto";

export const router = createRouter();

router.GET("/account/createAccount", async (context) => {
  const userController = UserFactory.create();

  const response = await userController.create(
    context.request.body as unknown as UserCreationInput
  );

  return Result.result(response);
});
