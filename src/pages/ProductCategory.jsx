import { useParams } from 'react-router-dom'; 
import { useState, useEffect } from 'react';
import { Spinner } from "flowbite-react";
import CardList from "../components/CardList.jsx";

export default function ProductCategory() {
    const { categoryId } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    async function getProducts() {
    const url = "https://api.escuelajs.co/api/v1/products/?categoryId=" + categoryId;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      setProducts(result.slice(0,4));
      setLoading(false);
    } catch (error) {
       console.error(error.message);
    }
  }


  useEffect(() => {
    getProducts();
  }, []);

  if(loading) {
    return (
      <div className="flex justify-center mx-auto">
        <Spinner aria-label="Default status example" />
        Sedang mengambil data...
      </div>
    )
  }

    return (
        <div className="px-10 py-5">
            <h1 className='text-4xl font-bold'>Produk Category {products[0].category.name}</h1>
            <CardList data={products} type="product"></CardList>
        </div>
    )
}