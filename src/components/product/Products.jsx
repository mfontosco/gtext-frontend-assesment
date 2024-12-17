import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Example() {
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

   // const addToCart = (product) => {
   //    const cart = JSON.parse(localStorage.getItem('cart')) || [];
   //    const exists = cart.find((item) => item.id === product.id);
   //    if (exists) {
   //       cart.map((item) =>
   //          item.id === product.id ? (item.quantity += 1) : item
   //       );
   //    } else {
   //       cart.push({ ...product, quantity: 1 });
   //    }
   //    localStorage.setItem('cart', JSON.stringify(cart));
   // };
   return (
      <div className="bg-white container mx-auto py-8">
         <h2 className="text-3xl mb-4">Products List</h2>
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
         <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-4 lg:max-w-7xl lg:px-8">
               <h2 className="sr-only">Products</h2>

               <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
                  {filteredProducts.map((product) => (
                     <div
                        key={product._id}
                        className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
                     >
                        <div className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-96">
                           <img
                              src={product.imageUrl}
                              alt={product.imageAlt}
                              className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                           />
                        </div>
                        <div className="flex flex-1 flex-col space-y-2 p-4">
                           <h3 className="text-sm font-medium text-gray-900">
                              <Link to={`/product/${product._id}`}>
                                 <span
                                    aria-hidden="true"
                                    className="absolute inset-0"
                                 />
                                 {product.name}
                              </Link>
                           </h3>
                           <p className="text-sm text-gray-500">
                              {product.description}
                           </p>
                           <div className="flex flex-1 flex-col justify-end">
                              <p className="text-sm italic text-gray-500">
                                 {product.options}
                              </p>
                              <p className="text-base font-medium text-gray-900">
                                 {product.price}
                              </p>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
   );
}
