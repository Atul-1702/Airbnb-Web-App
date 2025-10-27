import express from "express";
import type { Express } from "express";
import v1Router from "./routers/v1/index.router";
import { serverConfig } from "./config/env.config";
import bookingErrorMiddleware from "./middlewares/booking-error.middleware";
import AppErrorMiddleware from "./middlewares/app-error.middleware";

const app: Express = express();

app.use(express.json());

app.use("/api/v1", v1Router);

app.use(bookingErrorMiddleware);
app.use(AppErrorMiddleware);

app.listen(serverConfig.PORT, () => {
  console.log("Server is running at port", serverConfig.PORT);
});
