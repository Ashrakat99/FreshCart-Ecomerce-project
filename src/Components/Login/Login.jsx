import React, { useState, useContext, useEffect } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/UserContext";

export default function Login() {
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  console.log(userContext); 
  const setUserToken = userContext?.setUserToken; 


  useEffect(() => {
    const storedToken = localStorage.getItem("userToken");
    if (storedToken) {
      setUserToken(storedToken);
      navigate("/Home");
    }
  }, [setUserToken, navigate]);


  async function login(values) {
    try {
      setLoading(true);
      setApiError(null);
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );

      localStorage.setItem("userToken", data.token);
      setUserToken(data.token);
      navigate("/Home");
    } catch (error) {
      setApiError(error.response?.data?.message || "Login failed!");
    } finally {
      setLoading(false);
    }
  }

  function validateForm(values) {
    let errors = {};
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Password is required";
    }

    return errors;
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: validateForm,
    onSubmit: login,
  });

  return (
    <div className="w-[90%] mx-auto my-5 mt-10 p-12">
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <i className="fa fa-spinner fa-pulse fa-4x fa-fw text-white"></i>
        </div>
      )}
      <h1 className="text-4xl mb-6">Login Now</h1>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email:
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none sm:text-sm p-4"
          />
          {formik.errors.email && formik.touched.email && (
            <div className="mt-2 p-2 text-sm font-medium text-red-800 bg-red-100 border border-red-400 rounded">
              {formik.errors.email}
            </div>
          )}
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password:
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none sm:text-sm p-4"
          />
          {formik.errors.password && formik.touched.password && (
            <div className="mt-2 p-2 text-sm font-medium text-red-800 bg-red-100 border border-red-400 rounded">
              {formik.errors.password}
            </div>
          )}
        </div>
        {apiError && (
          <div className="p-3 text-sm text-red-800 bg-red-100 border border-red-400 rounded-md">
            {apiError}
          </div>
        )}

        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            <a href="/ForgotPassword" className="hover:underline text-2xl text-black font-semibold">
              Forgot your password?
            </a>
          </p>

          <button
            type="submit"
            className={`py-2 px-4 text-xl rounded-md border border-gray-500 shadow-sm 
              ${formik.isValid && formik.dirty 
                ? "bg-green-500 text-white hover:bg-green-600"  
                : "bg-transparent border-transparent text-gray-600 hover:bg-transparent " 
              }`}
            disabled={!formik.isValid || !formik.dirty || loading}
          >
            {loading ? <i className="fas fa-spinner fa-spin"></i> : "Login Now"}
          </button>
        </div>
      </form>
    </div>
  );
}
