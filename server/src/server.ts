import app from "./app";

const { PORT } = process.env;

if (PORT) {
  app.listen({ port: +PORT }, () => console.log(`Server up on port: ${PORT}`));
}
