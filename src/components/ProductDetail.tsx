import { ActionFunctionArgs, Form, redirect, useFetcher, useNavigate } from "react-router-dom"
import { Product } from "../types"
import { formatCurrency } from "../utils"
import { deleteProduct } from "../services/ProductService"

 type ProductDeatailsProps = {
    product: Product
 }

 
export async function action ({params}: ActionFunctionArgs) {
    if(params.id !== undefined){
        await deleteProduct(+ params.id)
    }
    
    return redirect('/')
}

export default function ProductDetail({product}: ProductDeatailsProps) {
    const fetcher = useFetcher()
    const isAvailable = product.availability
    const navigate = useNavigate()
  return (
    <tr className="border-b ">
        <td className="p-3 text-lg text-gray-800">
            {product.name}
        </td>
        <td className="p-3 text-lg text-gray-800">
            {formatCurrency(product.price)}
        </td>
        <td className="p-3 text-lg text-gray-800">
            <fetcher.Form method="POST">
                <button
                    typeof="button"
                    name="id"
                    value={product.id}
                    className={`${isAvailable ? 'text-black' : 'text-red-600'} rounded-lg p-2 text-xs uppercase font-bold w-full
                    border border-black-100 hover:cursor-pointer`}
                >
                    {isAvailable ? 'Producto Disponible' : 'Producto No Disponible'}
                </button>
            </fetcher.Form>
            
        </td>
        <td className="p-3 text-lg text-gray-800 ">
            <div className="flex gap-2 items-center">
                <button
                    onClick={() => navigate(`/productos/${product.id}/editar`)}
                    className="text-center bg-indigo-600 p-2 rounded-md font-bold text-white w-full hover:bg-indigo-700"
                >
                    Editar
                </button>
                <Form 
                    className="w-full"
                    method="POST"
                    action={`productos/${product.id}/eliminar`}
                    onSubmit={e => {
                        if(!confirm('¿Eliminar?')){
                            e.preventDefault()
                        }
                    }}
                >
                    <input 
                        type="submit"
                        value='Eliminar'
                        className="text-center bg-red-600 p-2 rounded-md font-bold text-white w-full hover:bg-indigo-red"
                     />
                </Form>
            </div>
        </td>
    </tr> 
  )
}
