import { FastifyRequest } from "fastify";
import { z } from "zod";
import { prisma } from "../database";
import dayJs from "dayjs";

export class AppController {
  static async createHabit(request: FastifyRequest) {
    const createHabitBody = z.object({
      title: z.string(),
      weekDays: z.array(z.number().min(0).max(6)),
    });

    const { title, weekDays } = createHabitBody.parse(request.body);

    const today = dayJs().startOf("day").toDate();

    await prisma.habit.create({
      data: {
        title,
        created_at: today,
        weekDays: {
          create: weekDays.map((weekDay) => ({ week_day: weekDay })),
        },
      },
    });

    return { message: "habit created" };
  }

  static async getDay(request: FastifyRequest) {
    const getDayParams = z.object({
      date: z.coerce.date(),
    });

    const { date } = getDayParams.parse(request.query);

    const parsedDate = dayJs(date).startOf("day");
    const weekDay = parsedDate.get("day");

    const possibleHabits = await prisma.habit.findMany({
      where: {
        created_at: { lte: date },

        weekDays: {
          some: { week_day: weekDay },
        },
      },
    });

    const day = await prisma.day.findFirst({
      where: {
        date: parsedDate.toDate(),
      },

      include: { dayHabits: true },
    });

    const completedHabits = day?.dayHabits.map((dayHabit) => dayHabit.habit_id);

    return { possibleHabits, completedHabits };
  }
}
