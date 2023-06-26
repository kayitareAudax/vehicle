import React,{useContext} from 'react';
import { CartContext } from '../context/CartContext';
import { ToastContainer, toast } from 'react-toastify';

const ProductCard = ({ name, quantity, productType, price, inDate }) => {
    const { addToCart } = useContext(CartContext);
    const handleAddToCart = () => {
        const item = {
          name,
          quantity,
          productType,
          price,
          inDate,
        };
        addToCart(item);
        toast("item added to cart",{position:'top-right',hideProgressBar:false,type:'success',closeOnClick:true})
      };
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col">
        <ToastContainer/>
      <h2 className="text-lg font-semibold mb-2">{name}</h2>
      <p className="text-gray-500 text-sm mb-2">Quantity: {quantity}</p>
      <p className="text-gray-500 text-sm mb-2">Type: {productType}</p>
      <p className="text-gray-500 text-sm mb-2">Price: ${price}</p>
      <p className="text-gray-500 text-sm mb-4">In Date: {inDate}</p>
      <button className="bg-mainColor hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
