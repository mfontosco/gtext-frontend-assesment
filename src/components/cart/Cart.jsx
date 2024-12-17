// components/Cart.js
import { useEffect, useState } from 'react';

function Cart() {
   const [cart, setCart] = useState([]);

   useEffect(() => {
      const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
      setCart(storedCart);
   }, []);

   const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
   );

   return (
      <div className="container mx-auto py-8">
         <h1 className="text-2xl font-bold mb-4">Cart Summary</h1>
         {cart.length === 0 ? (
            <p>Your cart is empty.</p>
         ) : (
            <div>
               {cart.map((item) => (
                  <div
                     key={item.id}
                     className="flex justify-between items-center border-b py-2"
                  >
                     <div>
                        <h2 className="font-semibold">{item.name}</h2>
                        <p>
                           ${item.price} x {item.quantity}
                        </p>
                     </div>
                     <p className="font-semibold">
                        ${item.price * item.quantity}
                     </p>
                  </div>
               ))}
               <h2 className="text-lg font-bold mt-4">
                  Total: ${total.toFixed(2)}
               </h2>
            </div>
         )}
      </div>
   );
}

export default Cart;
