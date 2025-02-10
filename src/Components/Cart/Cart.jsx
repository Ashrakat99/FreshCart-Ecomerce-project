import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/CartContext.jsx";
import { Link } from "react-router-dom";

export default function Cart() {
  let { getCartItem, deleteCartItem, updateCartItem, setCountt } = useContext(CartContext);
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [globalLoading, setGlobalLoading] = useState(false); 

  async function getItem() {
    setLoading(true);
    let { data } = await getCartItem();
    setCart(data);
    setLoading(false);
  }

  async function deleteItem(id) {
    setGlobalLoading(true); 
    let { data } = await deleteCartItem(id);
    setCart(data);
    setCountt(data.numOfCartItems);
    setGlobalLoading(false); // Stop loading
  }

  async function updateItem(id, count) {
    setGlobalLoading(true); 
    if (count < 1) {
      await deleteItem(id);
    } else {
      let { data } = await updateCartItem(id, count);
      setCart(data);
      setCountt(data.numOfCartItems);
    }
    setGlobalLoading(false);
  }

  async function clearCart() {
    setGlobalLoading(true); 
    if (cart && cart.data.products.length > 0) {
      await Promise.all(cart.data.products.map(product => deleteCartItem(product.product.id)));
      setCart(prevCart => ({
        ...prevCart,
        data: {
          ...prevCart.data,
          products: [],
          totalCartPrice: 0,
        },
        numOfCartItems: 0
      }));
      setCountt(0);
    }
    setGlobalLoading(false); 
  }

  useEffect(() => {
    getItem();
  }, []);

  return (
    <main className="bg-white min-h-screen p-10 relative">
      {(loading || globalLoading) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <i className="fa fa-spinner fa-pulse fa-4x fa-fw text-white"></i>
        </div>
      )}

      <section className="w-[90%] mx-auto bg-gray-100 p-8 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-4xl font-semibold text-black">Cart Shop</h2>
          {cart?.data?._id && (
            <Link
              to={`/ShippingAddress/${cart.data._id}`}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 hover:text-white"
            >
              Checkout
            </Link>
          )}
        </div>

        {cart?.data && (
          <div className="flex justify-between text-lg border-b pb-4 mb-4">
            <p className="text-black text-2xl font-bold">
              Total Price: <span className="text-green-600 text-2xl">{cart.data.totalCartPrice} EGP</span>
            </p>
            <p className="text-black text-2xl font-bold">
              Total Items: <span className="text-green-600 text-2xl">{cart.numOfCartItems}</span>
            </p>
          </div>
        )}

        {cart?.data.products.length > 0 ? (
          <div className="space-y-6">
            {cart.data.products.map((product, index) => (
              <React.Fragment key={index}>
                <div className="flex flex-col items-center p-4">
                  <div className="flex w-full justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <img
                        src={product.product.imageCover}
                        alt={product.product.title}
                        className="w-24 h-24 object-cover rounded-md"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{product.product.title}</h3>
                        <p className="text-gray-600">{product.price} EGP</p>
                        <button
                          onClick={() => deleteItem(product.product.id)}
                          className="text-red-500 cursor-pointer text-sm flex items-center bg-transparent hover:bg-transparent focus:outline-none focus:ring-0"
                          disabled={globalLoading} 
                        >
                          🗑 Remove
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 px-2 py-1">
                      <button
                        onClick={() => updateItem(product.product.id, product.count - 1)}
                        className="text-gray-700 text-lg px-3 py-1 border border-green-600 bg-transparent hover:bg-transparent transition-all focus:outline-none focus:ring-0"
                        disabled={globalLoading} 
                      >
                        -
                      </button>
                      <span className="text-lg font-medium text-gray-800">{product.count}</span>
                      <button
                        onClick={() => updateItem(product.product.id, product.count + 1)}
                        className="text-gray-700 text-lg px-3 py-1 border border-green-600 bg-transparent hover:bg-transparent transition-all focus:outline-none focus:ring-0"
                        disabled={globalLoading} 
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                {index < cart.data.products.length - 1 && <hr className="w-full border-gray-300 my-4" />}
              </React.Fragment>
            ))}
          </div>
        ) : (
          <h2 className="text-center text-xl text-gray-700 mt-5">Your Cart is Empty</h2>
        )}

        <div className="flex justify-center mt-6">
          {cart?.data && (
            <button
              onClick={clearCart}
              className="border-2 border-green-600 text-gray-800 px-6 py-2 rounded-md bg-transparent hover:bg-transparent focus:outline-none focus:ring-0"
              disabled={globalLoading} 
            >
              Clear your Cart
            </button>
          )}
        </div>
      </section>
    </main>
  );
}
