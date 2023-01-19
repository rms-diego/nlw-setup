import { FastifyRequest } from "fastify";
import { AppService } from "../service/app.service";
import { createHabitBody, getDayParams, toggleHabitParams } from "../@types";

export class AppController {
  static async createHabit(request: FastifyRequest) {
    const { title, weekDays } = createHabitBody.parse(request.body);

    await AppService.createHabit({ title, weekDays });

    return { message: "habit created" };
  }

  static async getDay(request: FastifyRequest) {
    const { date } = getDayParams.parse(request.query);

    const { possibleHabits, completedHabits } = await AppService.getDay(date);

    return { possibleHabits, completedHabits };
  }

  static async toggleHabit(request: FastifyRequest) {
    const { id } = toggleHabitParams.parse(request.params);

    await AppService.toggleHabit(id);

    return { message: "toggle completed" };
  }

  static async summary() {
    const summary = await AppService.summary();

    return summary;
  }
}
