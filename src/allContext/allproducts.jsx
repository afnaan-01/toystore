"use client";

import { Children, createContext, useContext, useState, useEffect } from "react";
import axios from "axios";


const AllProducts = createContext();


const AllProductsProvider = ({children}) =>{

    const [allProducts, setAllProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
          try {
             const res = await axios.get("/api/fatch-all-products");
            // console.log('Fetched data:', res.data.products);  
            setAllProducts(res.data.products || []);  
          } catch (err) {
            console.error('Error fetching products:', err);
          } finally {
            // setLoading(false);
          }
        };
      
        fetchProducts();
      }, []);
    

    return(
        <AllProducts.Provider value={{ allProducts, setAllProducts }}>
            {children}
        </AllProducts.Provider>
    )

}

const useAllProducts = () => useContext(AllProducts);

export default useAllProducts;
export { AllProductsProvider, AllProducts };