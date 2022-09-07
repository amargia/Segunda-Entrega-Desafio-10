import ContenedorMongoDB from "../../ContenedorMongoDB.js";
import { Cart } from "../../models/Cart.js";

class CarritoDaoMongoDB extends ContenedorMongoDB {
  constructor() {
    super(Cart);
  }

  async addProduct(idCart, product) {
    try {
        const array = await super.list();
        if (array.length === 0) {
            return "No hay productos en el carrito";
        }
        let indexCart = array.findIndex((cart) => cart.id === idCart);
        if (indexCart == -1) {
            return "No existe el carrito";
        } else {
            array[indexCart].products.push(product);
            await super.changeById(idCart, array[indexCart]);
            return "Producto agregado al carrito";
        }
    } catch (error) {
        throw new Error(`No se pudo agregar el producto al carrito. Error: ${error}`);
    }
  }
}

export default CarritoDaoMongoDB;