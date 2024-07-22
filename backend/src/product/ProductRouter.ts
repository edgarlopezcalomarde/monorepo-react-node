import { Router } from "express";
import { ProductController } from "./ProductController"
import { GetAllProducts } from "./GetAllProducts";


const router = Router();
const allProducts = new GetAllProducts();
const productsController = new ProductController(allProducts)

router.get("/product", productsController.getAll)

export default router;