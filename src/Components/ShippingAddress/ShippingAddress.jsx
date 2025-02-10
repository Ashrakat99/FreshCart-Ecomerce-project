import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext.jsx";
import { useFormik } from 'formik';

export default function ShippingAddress() {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { checkOut } = useContext(CartContext);
    const navigate = useNavigate(); 

    async function handelCheckOut(cartId, url) {
        try {
            setLoading(true);
            let { data } = await checkOut(cartId, url, formik.values);
            if (data.status === 'success') {
                window.location.href = data.session.url;
                setTimeout(() => {
                    navigate("/allOrders"); 
                }, 3000);
            } else {
                setError("Failed to process checkout.");
            }
        } catch (err) {
            setError("An error occurred during checkout.");
            console.error("Checkout Error:", err);
        } finally {
            setLoading(false);
        }
    }

    const formik = useFormik({
        initialValues: {
            details: '',
            phone: '',
            city: '',
        },
        onSubmit: () => handelCheckOut('67a8a935fa7895e81f36d06f', 'http://localhost:5173'),
    });

    return (
        <div className="w-[80%] mx-auto my-5 mt-10 p-12">
            {loading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <i className="fa fa-spinner fa-pulse fa-4x fa-fw text-white"></i>
                </div>
            )}

            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="details" className="block text-sm font-medium text-gray-700">Details:</label>
                <input
                    type="text"
                    id="details"
                    name="details"
                    value={formik.values.details}
                    onChange={formik.handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none sm:text-sm p-3 mb-8"
                />

                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone:</label>
                <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none sm:text-sm p-3 mb-8"
                />

                <label htmlFor="city" className="block text-sm font-medium text-gray-700">City:</label>
                <input
                    type="text"
                    id="city"
                    name="city"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none sm:text-sm p-3 mb-8"
                />

                {error && <p className="text-red-500 text-center mt-4">{error}</p>}
                <button
                    type="submit"
                    className="w-full mt-6 py-2 border-2 border-teal-500 text-teal-500 bg-transparent rounded-md text-xl hover:bg-transparent focus:outline-none focus:ring-0"
                    disabled={loading}
                >
                    {loading ? "Processing..." : "Pay Now"}
                </button>
            </form>
        </div>
    );
}
