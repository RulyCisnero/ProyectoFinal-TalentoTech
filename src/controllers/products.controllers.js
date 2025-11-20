/*import {
    getAllProductsService,
    getProductByIdService
} from "../services/products.services.js"*/
import * as productService from "../services/products.services.js"

export const getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProductsService()
        return res.status(200).json(products);
    } catch (error) {
        console.error('Error al obtener los productos: ', error)
        return res.status(500).json({ message: 'Error en el servidor al obtener los productos' })
    }
};

export const getProductById = async (req, res) => {
    try {
        const id = req.params.id;
        if (id) {
            const product = await productService.getProductByIdService(id)
            if (product) {
                return res.status(200).json(product);
            } else {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }
        } else {
            return res.status(400).json({ message: "ID invalido" })
        }
    } catch (error) {
        console.log(`Error al obtener el producto con el ID: ${id}`, error)
        return res.status(500).json({ message: `Error en el servidor al obtener el producto con el id: ${id}` })
    }
};

export const postProduct = async (req, res) => {
    try {
        const product = req.body;
        const newProduct = await productService.createProductService(product);
        return res.status(201).json({ message: "Producto creado: ", newProduct });
    } catch (error) {
        console.log('Error al crear el producto desde controller', error)
        return res.status(500).json({ message: 'Error en el servidor al crear el producto desde controller' })
    }
}

export const updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const producto = req.body;

        const updatedProduct = await productService.updateProductService(id, producto);

        if (!updatedProduct) {
            res.status(404).json({ message: "Producto no encontrado" });
            return;
        }
        return res.status(200).json({ message: "Producto actualizado: ", updatedProduct });
    } catch (error) {
        console.error("Error al actualizar el producto: ", error);
        return res.status(500).json({ message: "Error en el servidor al actualizar el producto" });
    }
}
export const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedProducto = await productService.deleteProductService(id);
        if (!deletedProducto) {
            res.status(404).json({ message: 'Producto no encontrado' });
            return;
        }
        res.status(200).json({ message: 'Producto eliminado: ', deletedProducto });
    } catch (error) {
        console.error('Error al eliminar el Producto desde controller: ', error)
        return res.status(500).json({ message: 'Error al eliminar Producto desde controller' });
    }
};
