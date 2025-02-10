import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validate: (values) => {
            const errors = {};
            if (!values.email) {
                errors.email = "Email is required";
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = "Invalid email address";
            }
            return errors;
        },
        onSubmit: async (values) => {
            try {
                setLoading(true);
                setError(null); 
                const response = await axios.post(
                    "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
                    { email: values.email }
                );
                console.log("Response:", response.data);
                navigate("/ResetPassword"); 
            } catch (error) {
                setError(error.response?.data?.message || "Something went wrong!");
            } finally {
                setLoading(false);
            }
        }
    });

    return (
        <div className="w-[90%] mx-auto my-5 mt-10 p-12 relative">
            {loading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <i className="fa fa-spinner fa-pulse fa-4x fa-fw text-white"></i>
                </div>
            )}

            <h1 className="text-4xl mb-2">Please enter your email</h1>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none sm:text-sm p-4"
                    />
                    {/* {formik.errors.email && formik.touched.email && (
                        <div className="mt-2 p-2 text-sm font-medium text-red-800 bg-red-100 border border-red-400 rounded">
                            {formik.errors.email}
                        </div>
                    )} */}
                </div>

                {error && <p className="text-red-500 text-center">{error}</p>}

                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="py-2 px-4 text-xl rounded-md border border-green-700 shadow-sm bg-transparent text-green-700 hover:bg-green-700 hover:text-white"
                    >
                        Verify
                    </button>
                </div>
            </form>
        </div>
    );
}
