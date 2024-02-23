import { Router } from "express";
import { createProduct, deleteProduct, getProduct, getProducts, 
    updateProduct, searchProduct } from "../controllers/products.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middlewares.js";
import { createProductSchema } from "../schemas/product.schema.js";

const router = Router();

router.get("/products", authRequired, getProducts);
router.post("/products", authRequired, validateSchema(createProductSchema), createProduct);
router.get("/products/:id", authRequired, getProduct);
router.put("/products/:id", authRequired, updateProduct);
router.delete("/products/:id", authRequired, deleteProduct);
router.get("/products", authRequired, searchProduct);


export default router;