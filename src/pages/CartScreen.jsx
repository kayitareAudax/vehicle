import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const CartScreen = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const makePurchases=async()=>{
    if(cartItems.length<1){
        return toast("no item from cart",{position:'top-right',hideProgressBar:false,type:'error',closeOnClick:true})
      }
      for(let i=0;i<cartItems.length;i++){
        const res=await axios.post(`/purchases/?productCode=${cartItems[i].productCode}&quantity=${cartItems[i].quantity}`,)
        console.log(res.data);
      }
  }
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Cart Screen</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md p-4 mb-4">
              <h2 className="text-lg font-semibold mb-2">{item.name}</h2>
              <p className="text-gray-500 text-sm mb-2">Quantity: {item.quantity}</p>
              <p className="text-gray-500 text-sm mb-2">Type: {item.productType}</p>
              <p className="text-gray-500 text-sm mb-2">Price: ${item.price}</p>
              <p className="text-gray-500 text-sm mb-4">In Date: {item.inDate}</p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-400 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                Remove from Cart
              </button>
            </div>
          ))}
         <button
                onClick={makePurchases}
                className="bg-blue-400 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
               Make Purchase
              </button>
        </div>
      )}
    </div>
  );
};

export default CartScreen;
