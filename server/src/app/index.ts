import "dotenv/config";
import fastify from "fastify";
import cors from "@fastify/cors";

import { appRoutes } from "../routes";

const app = fastify();
app.register(cors);
app.register(appRoutes);

export default app;
