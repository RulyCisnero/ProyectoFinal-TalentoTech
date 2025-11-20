import express from "express"
import {
    deleteProduct,
    getAllProducts,
    getProductById,
    postProduct,
    updateProduct,
} from "../controllers/products.controllers.js"


const routes = express.Router()

routes.get("/products", getAllProducts)
routes.get("/products/:id", getProductById)
routes.post("/products/create", postProduct )
routes.delete("/products/:id",deleteProduct)
routes.put("/products/:id",updateProduct) 


export default routes;