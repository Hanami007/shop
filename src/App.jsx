import React, { useState } from 'react'; // นำเข้า useState ที่นี่
import { Link } from 'react-router-dom';
import { products } from './Product';

export default function ShoppingPage() {
  const [cartItems, setCartItems] = useState([]); // สร้าง state สำหรับจัดการสินค้าที่จะเพิ่มในตะกร้า

  const addToCart = (product) => {
    setCartItems([...cartItems, product]); // เพิ่มสินค้าไปยังตะกร้า
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-red-500 p-4 text-white flex items-center justify-between">
        <div className="text-2xl font-bold">PingShop</div>
        <input
          type="text"
          placeholder="ค้นหาสินค้า"
          className="px-10 py-2 rounded-md"
        />
        <div className="flex items-center space-x-4">
          <div>เข้าสู่ระบบ</div>
          <div>สมัครใหม่</div>
          <Link to="/cart" state={{ cartItems }}>ตะกร้า ({cartItems.length})</Link>
        </div>
      </header>
      <main className="container mx-auto mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
              <img src={product.imageSrc} alt={product.name} className="w-full h-48 object-cover" />
              <h2 className="mt-2 text-lg font-bold">{product.name}</h2>
              <p className="text-gray-600">{product.shopName}</p>
              <p className="mt-2 text-red-500 font-bold">{product.price}</p>
              <button
                onClick={() => addToCart(product)}
                className="mt-4 w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600"
              >
                เพิ่มลงตะกร้า
              </button>
            </div>
          ))}
        </div>
      </main>
      <footer className="bg-gray-800 p-4 text-center text-white mt-10">
        &copy;  Best Website Award.
      </footer>
    </div>
  );
}
