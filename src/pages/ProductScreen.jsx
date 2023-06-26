import React, { useState,useContext, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import axios from 'axios';


const ProductScreen = () => {
    const [data,setData]=useState([]);
    const fetchProducts=async()=>{
        const resp=await axios.get("/products/");
        setData(resp.data);
        console.log(resp.data);
    }
    useEffect(()=>{
        fetchProducts();
    },[])
  const products = [
    {
      id: 1,
      name: 'Product 1',
      image: 'https://example.com/product1.jpg',
      quantity: 5,
      type: 'Type A',
      price: 9.99,
      indate: '2023-07-01',
    },
    {
      id: 2,
      name: 'Product 2',
      image: 'https://example.com/product2.jpg',
      quantity: 10,
      type: 'Type B',
      price: 14.99,
      indate: '2023-06-30',
    },
    {
        id: 2,
        name: 'Product 2',
        image: 'https://example.com/product2.jpg',
        quantity: 10,
        type: 'Type B',
        price: 14.99,
        indate: '2023-06-30',
      },{
        id: 2,
        name: 'Product 2',
        image: 'https://example.com/product2.jpg',
        quantity: 10,
        type: 'Type B',
        price: 14.99,
        indate: '2023-06-30',
      },{
        id: 2,
        name: 'Product 2',
        image: 'https://example.com/product2.jpg',
        quantity: 10,
        type: 'Type B',
        price: 14.99,
        indate: '2023-06-30',
      },
    // Add more products as needed
  ];

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
