import app from "./app";
import prisma from "./database";

app.get("/hello", async () => {
  const habits = await prisma.habit.findMany();

  return { message: "hello world!", habits: [...habits] };
});

app.listen({ port: 3000 }, () => console.log(`Server up on port: ${3000}`));
