import { useParams } from 'react-router-dom'; 
import { useState, useEffect } from 'react';
import { Spinner } from "flowbite-react";
import CardList from "../components/CardList.jsx";
import SearchComp from "../components/SearchComp";
import DropdownComp from "../components/DropdownComp";
import PaginationComp from "../components/PaginationComp";

export default function ProductCategory() {
    const { categoryId } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const onPageChange = (page) => {
      setCurrentPage(page);
      // tidak mengirim url, karena udh di rul = function sudah currentPage dari set
      getProducts();
    };

    function processSearch(event) {
      setSearch(event.target.value);
      let url = "https://api.escuelajs.co/api/v1/products" +
      "?title=" +
      search +
      "&categoryId=" + categoryId;
      setLoading(true);
      getProducts(url);
    }

    async function getProducts(
       url = "https://api.escuelajs.co/api/v1/products/?categoryId=" +
      categoryId +
      "&limit=8&offset=0" + currentPage,
    ) {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        
        const result = await response.json();
        setProducts(result);
        setLoading(false);
      } catch (error) {
        console.error(error.message);
      }
    }

    function processSort(type) {
      console.log(type);
      // copy isi products ke nama baru agar terdeteksi di setProoducts unutk memunculkan tampilan produk baru (sesuai hasli sort)
      let productNew = [...products];
      if (type == "harga termurah") {
        productNew.sort(function (a,b) {
          return a.price - b.price;
        });
      } else if (type == "harga termahal") {
        productNew.sort(function (a,b) {
          return b.price - a.price;
        });
      } else if (type == "alfabet menurun") {
        productNew.sort((a,b) => 
          a.title.toLowerCase().localeCompare(b.title.toLowerCase()),
        ); 
      } else if (type == "alfabet menaik") {
        productNew.sort((a,b) => 
          b.title.toLowerCase().localeCompare(a.title.toLowerCase()),
        ); 
      }
      setProducts(productNew);
    }
    
  useEffect(() => {
    getProducts();
  }, []);

    return (
        <>
            <div className='text-2xl font-bold text-center mt-2 mb-2'>
              Produk Kategori
            </div>

            <div className="flex mb-4 justify-center gap-2">
              <SearchComp processSearch={processSearch} />
              <DropdownComp processSort={processSort} />
            </div>

            {loading ? (
              <div className="flex justify-center">
                <Spinner aria-label='Default status example' />
                Sedang load..
              </div>
            ) : (
              <CardList data={products} type="products"></CardList>
            )}

            <div className="mt-5 mb-5">
              <PaginationComp currentPage={currentPage} onPageChange={onPageChange} />
            </div>
        </>
    )
}