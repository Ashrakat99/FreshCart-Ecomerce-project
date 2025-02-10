import React from "react";

const FreshCartApp = () => {
  return (
    <div className="bg-gray-100 p-6  shadow-md mx-auto">
      <div className="w-[90%] mx-auto">
      <h2 className="text-3xl font-semibold mb-2">Get the FreshCart app</h2>
      <p className="text-gray-600 mb-4">
        We will send you a link, open it on your phone to download the app
      </p>
      <div className="flex items-center gap-2">
        <input
          type="email"
          placeholder="E-mail ..."
          className="flex-1 p-2 border rounded-md"
        />
        <button className="bg-main text-white px-8  py-2 rounded-md hover:bg-green-600">
          Share App Link
        </button>
      </div>
      <div className="mt-6 border-t pt-4 flex justify-between items-center">
        <div className="flex gap-3">
          <h3 className="font-semibold font-3xl">Payment Partners</h3>
          <img src="src\assets\images\amazonpay-logo-rgb-clr.svg" alt="Amazon Pay" className="h-4" />
          <img src="src\assets\images\dls-logo-bluebox-solid.svg" alt="American Express" className="h-10 w-16" />
          <img src="src\assets\images\MClogo-c823e495c5cf455c89ddfb0e17fc7978.jpg" alt="Mastercard" className="h-10 w-24" />
          <img src="src\assets\images\paypal.png" alt="PayPal" className="h-8 w-8" />
        </div>
        <div className="flex gap-3">
          <h3 className="font-semibold font-3xl">Get deleviries with FreshCart</h3>
          <img src="src\assets\images\download-on-the-app-store.svg" alt="App Store" className="h-8" />
          <img src="src\assets\images\image.png" alt="Google Play" className="h-8" />
        </div>
      </div>
      </div>
    </div>
  );
};

export default FreshCartApp;
