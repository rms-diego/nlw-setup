import { z } from "zod";

// Create Habit types
export const createHabitBody = z.object({
  title: z.string(),
  weekDays: z.array(z.number().min(0).max(6)),
});

export interface ICreateHabitDTO {
  title: string;
  weekDays: number[];
}

// Get Day Types
export const getDayParams = z.object({
  date: z.coerce.date(),
});

// Toggle Habit types

export const toggleHabitParams = z.object({
  id: z.string().uuid(),
});
