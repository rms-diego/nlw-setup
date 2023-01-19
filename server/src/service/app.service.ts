import { ICreateHabitDTO } from "../@types";
import { prisma } from "../database";
import dayJs from "dayjs";

export class AppService {
  static async createHabit({ title, weekDays }: ICreateHabitDTO) {
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
  }

  static async getDay(date: Date) {
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
    console.log(completedHabits);

    return { possibleHabits, completedHabits };
  }

  static async toggleHabit(id: string) {
    const today = dayJs().startOf("day").toDate();

    let day = await prisma.day.findFirst({
      where: {
        date: today,
      },
    });

    if (!day) {
      day = await prisma.day.create({ data: { date: today } });
    }

    const dayHabit = await prisma.dayHabit.findUnique({
      where: {
        day_id_habit_id: {
          day_id: day.id,
          habit_id: id,
        },
      },
    });

    if (dayHabit) {
      await prisma.dayHabit.delete({
        where: {
          id: dayHabit.id,
        },
      });
      return;
    }

    await prisma.dayHabit.create({
      data: {
        day_id: day.id,
        habit_id: id,
      },
    });
  }

  static async summary() {
    const summary = await prisma.$queryRaw`
      SELECT 
        D.id, 
        D.date,
        (
          SELECT 
            cast(count(*) as float)
          FROM day_habits DH
          WHERE DH.day_id = D.id
        ) as completed,
        (
          SELECT
            cast(count(*) as float)
          FROM habit_week_days HDW
          JOIN habits H
            ON H.id = HDW.habit_id
          WHERE
            HDW.week_day = cast(strftime('%w', D.date/1000.0, 'unixepoch') as int)
            AND H.created_at <= D.date
        ) as amount
      FROM days D
    `;

    return summary;
  }
}
