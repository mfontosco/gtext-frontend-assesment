import woman from '../assets/woman.jpg';
import shoe1 from '../assets/shoe1.jpg';
import shoe2 from '../assets/shoe2.jpg';
import shirt from '../assets/shirt.jpg';
import new_arrivals from '../assets/new_arrivals.png';
const data = [
   {
      id: 1,
      name: 'Wireless Mouse',
      category: 'Electronics',
      price: 15.99,
      description: 'A comfortable wireless mouse with customizable buttons.',
      stock: 50,
      image: woman,
   },
   {
      id: 2,
      name: 'Bluetooth Headphones',
      category: 'Electronics',
      price: 39.99,
      description:
         'Noise-cancelling over-ear headphones with 20-hour battery life.',
      stock: 30,
      image: shoe1,
   },
   {
      id: 3,
      name: 'Smartphone Holder',
      category: 'Accessories',
      price: 9.99,
      description: 'Universal smartphone holder for cars.',
      stock: 100,
      image: shoe2,
   },
   {
      id: 4,
      name: 'Office Chair',
      category: 'Furniture',
      price: 89.99,
      description:
         'Ergonomic office chair with adjustable height and lumbar support.',
      stock: 20,
      image: shirt,
   },
   {
      id: 5,
      name: 'Gaming Keyboard',
      category: 'Electronics',
      price: 49.99,
      description: 'Mechanical gaming keyboard with RGB backlight.',
      stock: 25,
      image: new_arrivals,
   },
];
export default data;
