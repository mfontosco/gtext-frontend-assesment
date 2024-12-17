// components/ProductDetails.js
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import axios from 'axios';
import data from '../../utils/data';

function ProductDetails() {
   const { id } = useParams();
   const [product, setProduct] = useState(data[id]);

   useEffect(() => {
      const fetchedProduct = data[id]; // Fetch the product based on the ID from the data
      if (fetchedProduct) {
         setProduct(fetchedProduct); // Set the product to the state
      }
   }, [id]);
   //  useEffect(() => {
   //     axios
   //        .get(`https://fakestoreapi.com/products/${1}`)
   //        .then((response) => setProduct(response.data))
   //        .catch((error) =>
   //           console.error('Error fetching product details:', error)
   //        );
   //  }, [id]);

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
   };

   //  if (!product) return <div>Loading...</div>;

   return (
      <div className="container mx-auto py-8">
         <div className="flex flex-col md:flex-row">
            <img
               src={product.image}
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
               <button
                  onClick={() => addToCart(product)}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
               >
                  Add to Cart
               </button>
            </div>
         </div>
      </div>
   );
}
export default ProductDetails;
