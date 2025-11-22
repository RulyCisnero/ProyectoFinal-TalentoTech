/*import {
    getAllProductsService,
    getProductByIdService
} from "../services/products.services.js"*/
import * as productService from "../services/products.services.js"

export const getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProductsService()
        res.status(200).json(products);
    } catch (error) {
        console.error('Error al obtener los productos: ', error)
        res.status(500).json({ message: 'Error en el servidor al obtener los productos' })
    }
};

export const getProductById = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            //aca iguual no entraria nunca por que sin id entra en el endpoint de getAll
            //console.log("Entre aca sin id")
            res.status(400).json({ message: "ID inválido" });
        } else {
            const product = await productService.getProductByIdService(id)
            if (product) {
                res.status(200).json(product);
            } else {
                res.status(404).json({ message: 'Producto no encontrado' });
            }
        }
    } catch (error) {
        console.log(`Error al obtener el producto con el ID: ${id}`, error)
        return res.status(500).json({ message: `Error en el servidor al obtener el producto con el id: ${id}` })
    }
};

export const postProduct = async (req, res) => {
    try {
        const product = req.body;
        //como no puedo validar los campos de entrada por si se genera un nuevo campo ej:"descripcion"
        //se me ocurrio hacer una minima validacion de campos vacios, para no generar basura en la BD
        if (Object.keys(product).length === 0) {
            return res.status(400).json({ message: "El body está vacío" });
        }
        const newProduct = await productService.createProductService(product);
        res.status(201).json({ message: "Producto creado: ", newProduct });
    } catch (error) {
        console.log('Error al crear el producto desde controller', error)
        res.status(500).json({ message: 'Error en el servidor al crear el producto desde controller' })
    }
}

export const updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const producto = req.body;

        if (Object.keys(producto).length === 0) {
            return res.status(400).json({ message: "El body está vacío" });
        }
        const updatedProduct = await productService.updateProductService(id, producto);

        if (!updatedProduct) {
            console.log("Producto no encontrado")
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
            console.log("Producto no encontrado")
            res.status(404).json({ message: 'Producto no encontrado' });
            return;
        }
        res.status(200).json({ message: 'Producto eliminado: ', deletedProducto });
    } catch (error) {
        console.error('Error al eliminar el Producto desde controller: ', error)
        return res.status(500).json({ message: 'Error al eliminar Producto desde controller' });
    }
};
