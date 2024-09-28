import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function ShoppingCart() {
  const location = useLocation();
  const navigate = useNavigate();
  const cartItems = location.state?.cartItems || [];

  // ฟังก์ชันสำหรับคำนวณยอดรวม
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + parseFloat(item.price.slice(1)), 0).toFixed(2);
  };

  return (
    <div className="bg-gray-100 min-h-screen px-50">
      <h1 className="bg-red-500 p-4 text-white flex items-center justify-between text-2xl">ตะกร้าสินค้า</h1>
      {cartItems.length === 0 ? (
        <p className="mt-6 text-center">ยังไม่มีสินค้าในตะกร้า</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 mt-6">
          {cartItems.map((item, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4 border border-gray-300">
              <img src={item.imageSrc} alt={item.name} className="w-16 h-16 object-cover" />
              <div>
                <h2 className="text-lg font-bold">{item.name}</h2>
                <p className="text-gray-600">{item.shopName}</p>
                <p className="text-red-500 font-bold">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      {cartItems.length > 0 && (
        <div className="mt-6 bg-white p-4 rounded-lg shadow-md border border-gray-300">
          <h2 className="text-lg font-bold">ยอดรวม</h2>
          <p className="text-red-500 font-bold">${calculateSubtotal()}</p>
          <button
          onClick={() => navigate('/')}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          ชำระเงิน
        </button>
        </div>
      )}
      <div className="mt-6 flex justify-center">
        <button
          onClick={() => navigate('/')}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          กลับไปหน้าแรก
        </button>
      </div>
    </div>
  );
}
