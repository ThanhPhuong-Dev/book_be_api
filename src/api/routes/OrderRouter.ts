import { Router } from "express";
import { OrderControllers } from "../../controllers/OrderControllers";

const router = Router();
const order = new OrderControllers();
router.post("/buyOrder", order.buyBook);
router.get("/order-user/:id", order.getOrderUser);
router.get("/order-all", order.getOrderAll);
// router.delete("/order-cancel/:id", order.orderCancel);
export default router;
