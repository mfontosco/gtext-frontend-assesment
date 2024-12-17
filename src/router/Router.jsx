import { Routes, Route } from 'react-router-dom';
import ProductList from '../components/product/Products';
import ProductDetails from '../components/product/SingleProduct';
import Cart from '../components/cart/Cart';
const Router = () => {
   return (
      <Routes>
         <Route path="/" element={<ProductList />} />
         <Route path="/product/:id" element={<ProductDetails />} />
         <Route path="/cart" element={<Cart />} />
      </Routes>
   );
};

export default Router;
