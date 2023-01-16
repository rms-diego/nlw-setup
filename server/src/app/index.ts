import fastify from "fastify";
import cors from "@fastify/cors";
import "dotenv/config";

const app = fastify();
app.register(cors);

export default app;
