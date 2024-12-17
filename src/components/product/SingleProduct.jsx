import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaCartPlus } from 'react-icons/fa'; // Import the cart icon
import data from '../../utils/data';

function ProductDetails() {
   const { id } = useParams();
   const [product, setProduct] = useState(data[id]);
   const [cartCount, setCartCount] = useState(0); // New state to hold the cart count

   // Fetch the cart count from localStorage when the component mounts
   useEffect(() => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(totalCount); // Set the total cart count
   }, []);

   useEffect(() => {
      const fetchedProduct = data[id]; // Fetch the product based on the ID from the data
      if (fetchedProduct) {
         setProduct(fetchedProduct); // Set the product to the state
      }
   }, [id]);

   useEffect(() => {
      axios
         .get(`https://gtext-backend-1.onrender.com/products/${id}`)
         .then((response) => setProduct(response.data))
         .catch((error) =>
            console.error('Error fetching product details:', error)
         );
   }, [id]);

   const addToCart = (product) => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const exists = cart.find((item) => item.id === product.id);
      if (exists) {
         cart.map((item) =>
            item.id === product.id ? (item.quantity += 1) : item
         );
      } else {
         cart.push({ ...product, quantity: 1 });
      }
      localStorage.setItem('cart', JSON.stringify(cart));

      // Update cart count state after adding item
      const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(totalCount); // Update the state with the new cart count
   };

   if (!product) return <div>Loading...</div>;

   return (
      <div className="container mx-auto py-8">
         <div className="relative shadow-sm h-12 px-3 flex justify-end mb-4">
            <FaCartPlus className="text-2xl cursor-pointer" />
            {cartCount > 0 && (
               <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
               </span>
            )}
         </div>
         <div className="flex flex-col md:flex-row">
            <img
               src={product.imageUrl}
               alt={product.name}
               className="h-80 w-full md:w-1/2 object-cover rounded"
            />
            <div className="md:ml-8">
               <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
               <p className="text-gray-600 mb-4">{product.description}</p>
               <p className="text-lg font-semibold mb-4">
                  Price: ${product.price}
               </p>
               <p className="text-sm mb-4">
                  Stock: {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
               </p>
               <div className="flex items-center">
                  <button
                     onClick={() => addToCart(product)}
                     className="bg-blue-500 text-white px-4 py-2 rounded mr-4"
                  >
                     Add to Cart
                  </button>
                  {/* Cart Icon with item count */}
               </div>
            </div>
         </div>
      </div>
   );
}

export default ProductDetails;
