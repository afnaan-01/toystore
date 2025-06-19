"use client";

import { Children, createContext, useContext, useState } from "react";


const AllProducts = createContext();


const AllProductsProvider = ({children}) =>{

    const [allProducts, setAllProducts] = useState([]);

    

    return(
        <AllProducts.Provider value={{ allProducts, setAllProducts }}>
            {children}
        </AllProducts.Provider>
    )

}

const useAllProducts = () => useContext(AllProducts);

export default useAllProducts;
export { AllProductsProvider, AllProducts };