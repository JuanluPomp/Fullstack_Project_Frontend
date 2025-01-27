import { DraftProductSchema, Product, ProductSchema, ProductsSchema } from "../types"
import axios from "axios"
import { toBoolean } from "../utils"

type ProductData = {
    [k: string]: FormDataEntryValue
}

export async function addProduct(data: ProductData) {
    try {
        const result = DraftProductSchema.safeParse({
            name: data.name,
            price: +data.price,
            availability: true
        })
        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products`
            await axios.post(url, {
                name: result.data.name,
                price: result.data.price
            })
        } else {
            throw new Error('Datos no validos')
        }
    } catch (error) {
        console.log(error)
    }

}

export async function getProducts() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products`
        const { data } = await axios(url)
        const result = ProductsSchema.safeParse(data.data)

        if (result.success) {
            return result.data
        } else {
            throw new Error('Hubo un error')
        }

    } catch (error) {
        console.log(error)
    }
}
export async function getProductsByID(id: Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        const { data } = await axios(url)
        const result = ProductSchema.safeParse(data.data)
        if (result.success) {
            return result.data
        } else {
            throw new Error('Hubo un error')
        }

    } catch (error) {
        console.log(error)
    }
}
export async function updateProduct(data: ProductData, id: Product['id']) {
    try {
        const result = ProductSchema.safeParse({
            id,
            name: data.name,
            price: data.price,
            availability: toBoolean(data.availability.toString())
        })
        if (result.success) {
            await axios.put(`${import.meta.env.VITE_API_URL}/api/products/${id}`, result.data)
        }
    } catch (error) {
        console.log(error)
    }
}

export async function deleteProduct(id : Product['id']){
    try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/products/${id}`)
        console.log('Producto Eliminado')
    } catch (error) {
        console.log(error)
    }
}

export async function updateProductAvailability(id: Product['id']){
    try {
        await axios.patch(`${import.meta.env.VITE_API_URL}/api/products/${id}`)
        console.log('Product availability has been updated')
    } catch (error) {
        console.log(error)
    }
}