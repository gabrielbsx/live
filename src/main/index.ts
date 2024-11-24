import * as Aeria from "aeria";
import { router } from "./routes/index";
export * as collections from "./aeria-stuffs/collections";

const app = Aeria.init({
  router,
  config: {
    baseUrl: "/api",
    publicUrl: process.env.API_URL,
    secret: process.env.APPLICATION_SECRET,
    database: {
      mongodbUrl: process.env.MONGODB_URL,
    },
    defaultUser: {
      username: String(process.env.GODMODE_USERNAME),
      password: String(process.env.GODMODE_PASSWORD),
    },
    storage: {
      fs: process.env.STORAGE_PATH,
      tempFs: process.env.STORAGE_TEMP_PATH,
    },
  },
});

app.listen();

export default app;
