import { FastifyInstance } from "fastify";
import { AppController } from "./controller/app.controller";

export async function appRoutes(app: FastifyInstance) {
  const appController = new AppController();

  app.post("/habits", appController.createHabit);

  app.get("/day", appController.getDay);

  app.patch("/habits/:id/toggle", appController.toggleHabit);
}
