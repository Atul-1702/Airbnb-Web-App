import express from "express";
import type { Express } from "express";

const app: Express = express();

app.listen(3000, () => {
  console.log("Server is running at Port 3000");
});
