import { Router } from "express";
import { OrderControllers } from "../../controllers/OrderControllers";
import { RatingControllers } from "../../controllers/RatingControllers";

const router = Router();
const rating = new RatingControllers();
router.post("/evaluate", rating.Evaluate);
export default router;
