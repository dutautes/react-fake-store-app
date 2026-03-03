import BannerComp from "./components/BannerComp"
import CardList from "./components/CardList"
import { Button } from "flowbite-react"
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { HiCheckCircle } from "react-icons/hi";
import { Spinner } from "flowbite-react";
import { Link } from 'react-router-dom';

function App() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation(); 
  const [modalSukses, setModalSukses] = useState(false);

  useEffect(() => {
    // Cek kalo ada state openModal dari navigasi sebelumnya
    if (location.state?.openModal) {
      setModalSukses(true); // munculin modal
      setTimeout(() => { // matiin modal dengan set false setelah 1dtk
        setModalSukses(false);
      }, 2000);
      
      window.history.replaceState({}, document.title); // mengosongkan value state 
    }
  }, [location]);

  async function getData() {
    const url = "https://api.escuelajs.co/api/v1/categories";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      setCategories(result.slice(0,4));
    } catch (error) {
       console.error(error.message);
    }
  }

  async function getProducts() {
    const url = "https://api.escuelajs.co/api/v1/products";
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
    getData();
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
    <>
    {modalSukses && (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-xl max-w-md w-96">
          <div className="text-center">
            <HiCheckCircle className="mx-auto mb-4 h-14 w-14 text-green-600" />
            <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
              Pembelian Berhasil Dilakukan!
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Terima kasih telah melakukan pembelian.
            </p>
          </div>
        </div>
      </div>
    )}
      <BannerComp />
      <CardList data={categories} type="category" />
      <CardList data={products} type="product" >  
        <div className="flex justify-between mb-5 mt-7">
          <h5 className="text-xl font-bold">Daftar Produk Populer</h5>
          <Link to="/products">
            <Button color="blue">Lihat Selengkapnya</Button>
          </Link>
        </div>
      </CardList> 
    </>
  )
}

export default App