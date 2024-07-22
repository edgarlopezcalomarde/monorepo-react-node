import ky from "ky";
import { useEffect, useState } from "react";



interface Product {
    name: string
    description: string
    price: number
    isbn: string
}


function HomePage() {

    const [products, setProducts] = useState<Array<Product>>([])

    useEffect(() => {
        (async () => {
            try {
                const res: { data: Array<Product> } = await ky.get("/api/product").json();
                setProducts(res.data)
            } catch (err) {
                console.error(err)
            }
        })()
    }, [])


    return (
        <div>
            <h1>Productos</h1>
            <ul>
                {products.map((product) => (<li>
                    <p>{product.name}</p>
                    <p>{product.description}</p>
                    <p>{product.price}</p>
                    <p>{product.isbn}</p>
                </li>))}
            </ul>
        </div>
    )
}

export default HomePage
