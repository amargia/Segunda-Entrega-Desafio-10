import ContenedorMongoDB from "../../ContenedorMongoDB.js";
import { Products } from "../../models/Products.js";

class ProductosDaoMongoDB extends ContenedorMongoDB {
    constructor() {
        super(Products);
    }
}

export default ProductosDaoMongoDB;