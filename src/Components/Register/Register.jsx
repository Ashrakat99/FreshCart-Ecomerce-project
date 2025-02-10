import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';

export default function Register() {
    const [apiError, setApiError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { setUserToken } = useContext(UserContext);

    async function register(values) {
        try {
        setLoading(true);
        const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values);
        localStorage.setItem('userToken', data.token);
        setUserToken(data.token);
        navigate('/login');
        setLoading(false);
        } catch (error) {
        setApiError(error.response?.data?.message || 'Registration failed!');
        } finally {
        setLoading(false);
        }
    }

    function validateForm(values) {
        let errors = {};
        if (!values.name) {
        errors.name = 'Name is required';
        } else if (!/^[A-Z][a-zA-Z]{3,14}$/.test(values.name)) {
        errors.name = 'Invalid Name (First letter must be capital and length 4-15)';
        }
        if (!values.email) {
        errors.email = 'Email is required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
        }
        if (!values.password) {
        errors.password = 'Password is required';
        }
        if (!values.rePassword) {
        errors.rePassword = 'Please confirm your password';
        } else if (values.password !== values.rePassword) {
        errors.rePassword = 'Passwords do not match';
        }
        if (!values.phone) {
        errors.phone = 'Phone number is required';
        } else if (!/^01[0125][0-9]{8}$/.test(values.phone)) {
        errors.phone = 'Invalid phone number';
        }
        return errors;
    }

    const formik = useFormik({
        initialValues: {
        name: '',
        email: '',
        password: '',
        rePassword: '',
        phone: '',
        },
        validate: validateForm,
        onSubmit: register,
    });

    return (
        <div className="w-[90%] mx-auto my-3  p-6">
        <h1 className="text-4xl mb-6">Register Now</h1>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
            <input
                type="text"
                name="name"
                id="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none sm:text-sm p-3"
            />
            {formik.errors.name && formik.touched.name && (
                <div className="mt-2 p-2 text-sm font-medium text-red-800 bg-red-100 border border-red-400 rounded">
                {formik.errors.name}
                </div>
            )}
            </div>
            <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
            <input
                type="email"
                name="email"
                id="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none sm:text-sm p-3"
            />
            {formik.errors.email && formik.touched.email && (
                <div className="mt-2 p-2 text-sm font-medium text-red-800 bg-red-100 border border-red-400 rounded">
                {formik.errors.email}
                </div>
            )}
            </div>
            <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
            <input
                type="password"
                name="password"
                id="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none sm:text-sm p-3"
            />
            {formik.errors.password && formik.touched.password && (
                <div className="mt-2 p-2 text-sm font-medium text-red-800 bg-red-100 border border-red-400 rounded">
                {formik.errors.password}
                </div>
            )}
            </div>
            <div>
            <label htmlFor="rePassword" className="block text-sm font-medium text-gray-700">Confirm Password:</label>
            <input
                type="password"
                name="rePassword"
                id="rePassword"
                value={formik.values.rePassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none sm:text-sm p-3"
            />
            {formik.errors.rePassword && formik.touched.rePassword && (
                <div className="mt-2 p-2 text-sm font-medium text-red-800 bg-red-100 border border-red-400 rounded">
                {formik.errors.rePassword}
                </div>
            )}
            </div>
            <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number:</label>
            <input
                type="tel"
                name="phone"
                id="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none sm:text-sm p-3"
            />
            {formik.errors.phone && formik.touched.phone && (
                <div className="mt-2 p-2 text-sm font-medium text-red-800 bg-red-100 border border-red-400 rounded">
                {formik.errors.phone}
                </div>
            )}
            </div>
            {apiError && (
            <div className="p-3 text-sm text-red-800 bg-red-100 border border-red-400 rounded-md">
                {apiError}
            </div>
            )}
            <div className="flex items-center justify-end">
            <button
                type="submit"
                className={`py-2 px-4 text-xl rounded-md border border-gray-500 shadow-sm 
                ${formik.isValid && formik.dirty 
                    ? "bg-green-500 text-white hover:bg-green-600"  
                    : "bg-transparent border-transparent text-gray-600 hover:bg-transparent " 
                }`}
                disabled={!formik.isValid || !formik.dirty || loading}
            >
                {loading ? <i className="fas fa-spinner fa-spin"></i> : "Register Now"}
            </button>
            
            </div>
        </form>
        </div>
    );
}

