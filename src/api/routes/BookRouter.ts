import { Router } from "express";
import bookControllers from "../../controllers/BookControllers";

const router = Router();

router.get("/getAllBook", bookControllers.getAllBook);
router.post("/recommend", bookControllers.getRecommend);
router.get("/book-detail/:id", bookControllers.getDetais);
router.get("/search", bookControllers.search);
router.get("/publication", bookControllers.publication);
router.post("/create_book", bookControllers.createBook);
router.put("/update_book/:id", bookControllers.updateBook);
router.delete("/delete_book/:id", bookControllers.deleteBook);

export default router;
