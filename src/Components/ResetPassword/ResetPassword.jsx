import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            resetCode: "",
        },
        validate: (values) => {
            const errors = {};
            if (!values.resetCode) {
                errors.resetCode = "Reset code is required";
            } else if (!/^\d{6}$/.test(values.resetCode)) {
                errors.resetCode = "Invalid reset code (must be 6 digits)";
            }
            return errors;
        },
        onSubmit: async (values) => {
            try {
                setLoading(true);
                setError(null);
                const response = await axios.post(
                    "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
                    { resetCode: values.resetCode }
                );
                console.log("Response:", response.data);
                navigate("/update-password"); // Redirect to update password page
            } catch (error) {
                setError(error.response?.data?.message || "Invalid code. Please try again.");
            } finally {
                setLoading(false);
            }
        }
    });

    return (
        <div className="w-[90%] mx-auto my-5 mt-10 p-12">
            {loading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <i className="fa fa-spinner fa-pulse fa-4x fa-fw text-white"></i>
                </div>
            )}
            <h1 className="text-4xl mb-2">Reset Your Account Password</h1>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <input
                        type="text"
                        name="resetCode"
                        placeholder="code"
                        value={formik.values.resetCode}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none sm:text-sm p-4"
                    />
                    {/* {formik.errors.resetCode && formik.touched.resetCode && (
                        <div className="mt-2 p-2 text-sm font-medium text-red-800 bg-red-100 border border-red-400 rounded">
                            {formik.errors.resetCode}
                        </div>
                    )} */}
                </div>

                {error && <p className="text-red-500 text-center">{error}</p>}

                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className={`py-2 px-4 text-xl rounded-md border border-green-700 shadow-sm bg-transparent border-transparent text-green-700 hover:bg-green-700 hover:text-white
                            `}
                    >
                    verify
                    </button>
                </div>
            </form>
        </div>
    );
}
