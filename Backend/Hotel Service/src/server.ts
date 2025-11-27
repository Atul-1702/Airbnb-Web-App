import express, { Express } from "express";
import serverConfig from "./config/env.config";
import HotelErrorMiddleware from "./middlewares/hotel-error.middlware";
import AppErrorMiddleware from "./middlewares/app-error.middleware";
import router from "./routers/v1/index.router";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router);

app.use(HotelErrorMiddleware);
app.use(AppErrorMiddleware);

app.listen(serverConfig.PORT, () => {
  console.log("Server is running at Port", serverConfig.PORT);
});
