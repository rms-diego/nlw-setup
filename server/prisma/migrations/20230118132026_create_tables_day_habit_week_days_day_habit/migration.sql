-- CreateTable
CREATE TABLE "days" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "habit_week_days" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "habitId" TEXT NOT NULL,
    "weekDay" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "day_habit" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "day_id" TEXT NOT NULL,
    "habit_id" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "days_date_key" ON "days"("date");

-- CreateIndex
CREATE UNIQUE INDEX "habit_week_days_habitId_weekDay_key" ON "habit_week_days"("habitId", "weekDay");

-- CreateIndex
CREATE UNIQUE INDEX "day_habit_day_id_key" ON "day_habit"("day_id");

-- CreateIndex
CREATE UNIQUE INDEX "day_habit_habit_id_key" ON "day_habit"("habit_id");

-- CreateIndex
CREATE UNIQUE INDEX "day_habit_day_id_habit_id_key" ON "day_habit"("day_id", "habit_id");
