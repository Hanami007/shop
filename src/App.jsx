import React, { useState } from 'react'; // นำเข้า useState ที่นี่
import { Link } from 'react-router-dom';
import { products } from './Product';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function ShoppingPage() {
  const [cartItems, setCartItems] = useState([]); // สร้าง state สำหรับจัดการสินค้าที่จะเพิ่มในตะกร้า
  const [open, setOpen] = useState(false); // สร้าง state สำหรับการเปิดปิด Dialog

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
          <button onClick={() => setOpen(true)}>ตะกร้า ({cartItems.length})</button>
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
        &copy; Best MEMEsite Award.
      </footer>

      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out"
        />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <DialogPanel
                transition
                className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out"
              >
                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                  <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div className="flex items-start justify-between">
                      <DialogTitle className="text-lg font-medium text-gray-900">ตะกร้า</DialogTitle>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          onClick={() => setOpen(false)}
                          className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                        >
                          <span className="absolute -inset-0.5" />
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-8">
                      <div className="flow-root">
                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                          {cartItems.map((product) => (
                            <li key={product.id} className="flex py-6">
                              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img
                                  alt={product.name}
                                  src={product.imageSrc}
                                  className="h-full w-full object-cover object-center"
                                />
                              </div>

                              <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3>{product.name}</h3>
                                    <p className="ml-4">{product.price}</p>
                                  </div>
                                  <p className="mt-1 text-sm text-gray-500">{product.shopName}</p>
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm">
                                  <p className="text-gray-500">Qty 1</p>
                                  <div className="flex">
                                    <button type="button" className="font-medium text-red-600 hover:text-red-500">
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>
                        {cartItems.reduce((total, product) => total + parseInt(product.price.replace('฿', '')), 0)} ฿
                      </p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                    <div className="mt-6">
                      <a
                        href="/"
                        className="flex items-center justify-center rounded-md border border-transparent bg-red-500 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-red-300"
                      >
                        Checkout
                      </a>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <p>
                        or{' '}
                        <button
                          type="button"
                          onClick={() => setOpen(false)}
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}