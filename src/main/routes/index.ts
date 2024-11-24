import { createRouter } from "aeria";
import { UserFactory } from "@/main/factories/user.factory";

export const router = createRouter();

router.GET("/example/create-user", async (context) => {
  const userController = UserFactory.create();

  userController.create({});

  return {
    ok: true,
  };
});
