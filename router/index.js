import express from "express";
const router = express.Router();

import { Router } from "express";

//routers
import { products } from "./productRouter.js";
import { cart } from "./cartRouter.js";

//middlewares
router.use("/api/productos", products);
router.use("/api/carrito", cart);

export { router };