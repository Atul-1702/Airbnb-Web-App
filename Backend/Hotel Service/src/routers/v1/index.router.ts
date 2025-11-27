import express, { Router } from "express";
import hotelRouter from "./hotel.router";

const router: Router = express.Router();

router.use("/hotels", hotelRouter);

export default router;
