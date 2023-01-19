import { FastifyInstance } from "fastify";
import { AppController } from "./controller/app.controller";

export async function appRoutes(app: FastifyInstance) {
  app.post("/habits", AppController.createHabit);

  app.get("/day", AppController.getDay);

  app.patch("/habits/:id/toggle", AppController.toggleHabit);
}
