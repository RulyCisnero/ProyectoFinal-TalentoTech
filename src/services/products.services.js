import { obtenerProducto, obtenerProductos, actualizarProducto, agregarProducto, eliminarProducto} from "../models/products.models.js"

export const getAllProductsService = async () => {
  return (
    new Promise(async (res, rej) => {
      console.log("test2 dentro de servicio")
      try {
        const productos = await obtenerProductos()
        res(productos);
      } catch (error) {
        rej()
      }
    })
  )
};

export const getProductByIdService = async (id) => {
  return (
    new Promise(async (res, rej) => {
      try {
        const product = await obtenerProducto(id)
        res(product)
      } catch (error) {
        rej(error)
      }
    })
  )
};

//Probar!!
/* export const updateProductService = async (producto) => {
  return (
    new Promise(async (res, rej) => {
      try {
        const product = await actualizarProducto(producto)
        res(product)
      } catch (error) {
        rej(error)
      }
    })
  )
}; */

export const updateProductService = async (id, producto) => {
  return new Promise(async (res, rej) => {
    try {
      const productoActualizado = await actualizarProducto(id, producto);
      res(productoActualizado);
    } catch (error) {
      rej(error);
    }
  });
}; 


export const createProductService = async (producto) => {
  return (
    new Promise(async (res, rej) => {
      try {
        const product = await agregarProducto(producto)
        res(product)
      } catch (error) {
        rej(error)
      }
   })
  )
}

export const deleteProductService = async (id) => {
  return (
    new Promise(async (res, rej) => {
      try {
        const productEliminado = await eliminarProducto(id)
        res(productEliminado)
      } catch (error) {
        rej(error)
      }
    })
  )
};