import express from "express";
import { UserController } from "../../Controller/index.js";
const router=express.Router();

router.post("/create",UserController.create);
router.get("/test",UserController.testRouter);

export default router;