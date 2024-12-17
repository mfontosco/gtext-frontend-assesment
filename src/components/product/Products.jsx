// components/ProductList.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import data from '../../utils/data';

function ProductList() {
   const [products, setProducts] = useState([]);
   const [search, setSearch] = useState('');
   const [category, setCategory] = useState('');

   useEffect(() => {
      axios
         .get('https://gtext-backend-1.onrender.com/products')
         .then((response) => setProducts(response.data))
         .catch((error) => console.error('Error fetching products:', error));
   }, []);

   const filteredProducts = products.filter(
      (product) =>
         product.name.toLowerCase().includes(search.toLowerCase()) &&
         (!category || product.category === category)
   );

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

   return (
      <div className="container mx-auto py-8">
         <div className="flex justify-between items-center mb-4">
            <input
               type="text"
               placeholder="Search products"
               value={search}
               onChange={(e) => setSearch(e.target.value)}
               className="p-2 border rounded w-1/2"
            />
            <select
               value={category}
               onChange={(e) => setCategory(e.target.value)}
               className="p-2 border rounded"
            >
               <option value="">All Categories</option>
               {Array.from(
                  new Set(products.map((product) => product.category))
               ).map((cat) => (
                  <option key={cat} value={cat}>
                     {cat}
                  </option>
               ))}
            </select>
         </div>
         <div className="grid grid-cols-1  md:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
               <div key={product.id} className="bg-white p-4 rounded shadow">
                  <img
                     src={product.imageUrl}
                     alt={product.name}
                     className="h-40 w-full object-cover mb-2 rounded"
                  />
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-gray-600">${product.price}</p>
                  <Link
                     to={`/product/${1}`}
                     className="text-blue-500 border shadow-sm px-4 py-2  mr-4 hover:underline"
                  >
                     View Details
                  </Link>
                  <button
                     onClick={() => addToCart(product)}
                     className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                  >
                     Add to Cart
                  </button>
               </div>
            ))}
         </div>
      </div>
   );
}

export default ProductList;
