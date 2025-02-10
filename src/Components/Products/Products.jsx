import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext.jsx"; 

export default function Products() {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const { addToCart, setCount, addToWhishlist, removeFromWhishlist } = useContext(CartContext);
    const [wishlist, setWishlist] = useState([]); 
    const [alertMessage, setAlertMessage] = useState(""); 
    const [actionLoading, setActionLoading] = useState(false);

    async function getProducts() {
        try {
            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
            setProducts(data.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    }

    function showAlert(message) {
        setAlertMessage(message);
        setTimeout(() => {
            setAlertMessage("");
        }, 3000); 
    }

    useEffect(() => {
        const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        setWishlist(savedWishlist);
    }, []);

    useEffect(() => {
        if (wishlist.length > 0) {
            localStorage.setItem("wishlist", JSON.stringify(wishlist));
        }
    }, [wishlist]);

    async function handleAddToCart(productId) {
        try {
            setActionLoading(true);
            let { data } = await addToCart(productId); 
            showAlert("🛒 Item successfully added to cart!");
            setCount(data.numOfCartItems);
        } catch (error) {
            console.error("Error adding to cart:", error);
        } finally {
            setActionLoading(false);
        }
    }

    async function handleToggleWishlist(productId) {
        try {
            setActionLoading(true);
            let updatedWishlist;
            
            if (wishlist.includes(productId)) {
                await removeFromWhishlist(productId);
                updatedWishlist = wishlist.filter(id => id !== productId);
                showAlert("💔 Removed from Wishlist!");
            } else {
                await addToWhishlist(productId);
                updatedWishlist = [...wishlist, productId];
                showAlert("❤️ Added to Wishlist!");
            }
            
            setWishlist(updatedWishlist);
            localStorage.setItem("wishlist", JSON.stringify(updatedWishlist)); // Save immediately
        } catch (error) {
            console.error("Error toggling wishlist:", error);
        } finally {
            setActionLoading(false);
        }
    }

    useEffect(() => {
        getProducts();
    }, []);

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            {loading || actionLoading ? (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <i className="fa fa-spinner fa-pulse fa-4x fa-fw text-white"></i>
                </div>
            ) : (
                <div className="w-[90%] mx-auto py-6">

                    {alertMessage && (
                        <div className="fixed top-20 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 transition-opacity duration-300">
                            {alertMessage}
                        </div>
                    )}

                    <div className="flex justify-center mb-6">
                        <input
                            type="text"
                            placeholder="Search for products..."
                            className="m-4 p-2 w-[75%] rounded-lg border border-gray-200"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <div key={product.id} className="p-2">
                                    <div className="product p-2 rounded-lg">
                                        <Link to={`/ProductDetails/${product.id}`}>
                                            <img 
                                                src={product.imageCover} 
                                                className="w-full h-[450px] object-cover rounded-lg" 
                                                alt={product.title} 
                                            />
                                            <h3 className="text-main">{product.category.name}</h3>
                                            <h3 className="text-xl text-black">{product.title.split(' ').slice(0, 2).join(' ')}</h3>
                                            <div className='flex justify-between text-black'>   
                                                <span>{product.price} EGP</span>
                                                <span><i className='fa fa-star rating-color'></i>{product.ratingsAverage}</span>
                                            </div>
                                        </Link>

                                        <div className="flex items-center justify-between mt-2">
                                            {/* Add to Cart Button */}
                                            <button
                                                onClick={() => handleAddToCart(product.id)}
                                                className="btn w-full"
                                            >
                                                Add to Cart
                                            </button>

                                            {/* Wishlist Heart Button */}
                                            <button
                                                onClick={() => handleToggleWishlist(product.id)}
                                                className="ml-2 text-2xl bg-transparent focus:outline-none focus:ring-0 hover:bg-transparent"
                                            >
                                                <i
                                                    className={`fa-heart ${wishlist.includes(product.id) ? "fas text-red-500" : "far text-black"}`}
                                                ></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center w-full">No products found.</p>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
