import v1Router from "./v1/index.js"
import express from "express";

const router=express.Router();

router.use("/v1",v1Router);

export default router;