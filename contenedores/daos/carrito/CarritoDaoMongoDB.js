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
  
  async save(userId) {
    let object = { userId, products: []}
    const data = await super.save(object)
    return data;
  }

  async deleteProduct(idCart, idProduct) {
    try {
        const array = await super.list();
        if (array.length === 0) {
            return "No hay productos en el carrito";
        }
        let indexCart = array.findIndex((cart) => cart.id === idCart);
        if (indexCart == -1) {
            return "No existe el carrito";
        } else {
            let indexProduct = array[indexCart].products.findIndex((product) => product.id === idProduct);
            if (indexProduct == -1) {
                return "No existe el producto en el carrito";
            } else {
                array[indexCart].products.splice(indexProduct, 1);
                await super.changeById(idCart, array[indexCart]);
                return "Producto eliminado del carrito";
            }
        }
    } catch (error) {
        throw new Error(`No se pudo eliminar el producto del carrito. Error: ${error}`);
    }
  }

  async deleteAllProducts(idCart) {
    try {
        const array = await super.list();
        if (array.length === 0) {
            return "No hay productos en el carrito";
        }
        let indexCart = array.findIndex((cart) => cart.id === idCart);
        if (indexCart == -1) {
            return "No existe el carrito";
        } else {
            array[indexCart].products = [];
            await super.changeById(idCart, array[indexCart]);
            return "Productos eliminados del carrito";
        }
    } catch (error) {
        throw new Error(`No se pudo eliminar los productos del carrito. Error: ${error}`);
    }
  }
}

export default CarritoDaoMongoDB;