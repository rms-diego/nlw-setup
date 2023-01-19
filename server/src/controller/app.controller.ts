import { FastifyRequest } from "fastify";
import { prisma } from "../database";
import dayJs from "dayjs";
import { AppService } from "../service/app.service";
import { createHabitBody, getDayParams, toggleHabitParams } from "../@types";

export class AppController {
  public async createHabit(request: FastifyRequest) {
    const { title, weekDays } = createHabitBody.parse(request.body);

    await AppService.createHabit({ title, weekDays });

    return { message: "habit created" };
  }

  public async getDay(request: FastifyRequest) {
    const { date } = getDayParams.parse(request.query);

    const { possibleHabits, completedHabits } = await AppService.getDay(date);

    return { possibleHabits, completedHabits };
  }

  public async toggleHabit(request: FastifyRequest) {
    const { id } = toggleHabitParams.parse(request.params);

    await AppService.toggleHabit(id);

    return { message: "toggle completed" };
  }
}
