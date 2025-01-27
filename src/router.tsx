import { createBrowserRouter } from "react-router-dom"
import Layout from "./layouts/Layout"
import Products from "./views/Products"
import NewProduct, {action as newProductAction} from "./views/NewProduct"
import { loader as productsLoader, action as actionProducts} from "./views/Products"
import { loader as editProductsLoader, action as sendEditedProduct } from "./views/EditProduct"
import EditProduct from "./views/EditProduct"
import {action as deleteActionProduct} from './components/ProductDetail'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                index: true,
                element: <Products/>,
                loader: productsLoader,
                action: actionProducts
            },
            {
                path: 'productos/nuevo',
                element: <NewProduct/>,
                action: newProductAction
            },
            {
                path: 'productos/:id/editar', // ROA pattern
                element: <EditProduct/>,
                loader: editProductsLoader,
                action: sendEditedProduct
            },
            {
                path: 'productos/:id/eliminar',
                action: deleteActionProduct
            }
        ] 
    }
])