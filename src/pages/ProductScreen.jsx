import React, { useState,useContext, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import axios from 'axios';


const ProductScreen = () => {
    const [data,setData]=useState([]);
    const fetchProducts=async()=>{
        let config = {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          };
        const resp=await axios.get("/productsGet/",config);
        setData(resp.data);
        console.log(resp.data);
    }
    useEffect(()=>{
        fetchProducts();
    },[])
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Product Screen</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.map((product) => (
          <ProductCard key={data.id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default ProductScreen;
