import express from "express";
import { addProduct, removeProduct, listProducts, singleProduct } from "../controllers/productController.js";
import upload from "../middleware/Multer.js";
import adminAuth from "../middleware/adminAuth.js";

const ProductRouter = express.Router();

ProductRouter.post("/add",adminAuth,upload.fields([{name:"image1",maxCount:1},{name:"image2",maxCount:1},{name:"image3",maxCount:1},{name:"image4",maxCount:1}]) ,addProduct);
ProductRouter.delete("/remove/:id", adminAuth,removeProduct);
ProductRouter.get("/list", listProducts);
ProductRouter.post("/:id", singleProduct);

export default ProductRouter;
