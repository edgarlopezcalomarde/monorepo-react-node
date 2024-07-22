import { Request, Response, Router } from "express";
import ProductRouter from "../product/ProductRouter";

const router = Router();

// router.get("/api", (req: Request, res: Response) => res.send("Backend is working !!"))
router.use("/api", ProductRouter)

export default router;