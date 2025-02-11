import React from "react";
import amazonPay from "../../assets/images/amazonpay-logo-rgb-clr.svg";
import americanExpress from "../../assets/images/dls-logo-bluebox-solid.svg";
import mastercard from "../../assets/images/MClogo-c823e495c5cf455c89ddfb0e17fc7978.jpg";
import paypal from "../../assets/images/paypal.png";
import appStore from "../../assets/images/download-on-the-app-store.svg";
import googlePlay from "../../assets/images/image.png";


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
      <div className="mt-6 border-t pt-4 flex flex-col md:grid md:grid-cols-2 lg:flex-row lg:justify-between lg:items-center gap-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-3 text-center lg:text-left">
          <h3 className="font-semibold text-lg sm:text-xl mx-auto lg:mx-0">Payment Partners</h3>
          <div className="flex flex-wrap justify-center lg:justify-start gap-3 mt-2 lg:mt-0">
            <img src={amazonPay} alt="Amazon Pay" className="h-4 sm:h-6" />
            <img src={americanExpress} alt="American Express" className="h-10 w-16 sm:h-12 sm:w-20" />
            <img src={mastercard} alt="Mastercard" className="h-10 w-24 sm:h-12 sm:w-28" />
            <img src={paypal} alt="PayPal" className="h-8 w-8 sm:h-10 sm:w-10" />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-3 text-center lg:text-left">
          <h3 className="font-semibold text-lg sm:text-xl mx-auto lg:mx-0">Get deliveries with FreshCart</h3>
          <div className="flex flex-wrap justify-center lg:justify-start gap-3 mt-2 lg:mt-0">
            <img src={appStore} alt="App Store" className="h-8 sm:h-10" />
            <img src={googlePlay} alt="Google Play" className="h-8 sm:h-10" />
          </div>
        </div>

</div>

      </div>
    </div>
  );
};

export default FreshCartApp;
