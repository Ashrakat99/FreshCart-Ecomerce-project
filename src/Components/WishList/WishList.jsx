import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";

export default function Wishlist() {
    let { getWhishlist, removeFromWhishlist, addToCart } = useContext(CartContext);
    const [wishlist, setWishlist] = useState(null);
    const [loading, setLoading] = useState(true);
    const [globalLoading, setGlobalLoading] = useState(false); // Global loading state

    async function getWishlistItems() {
        setLoading(true);
        let { data } = await getWhishlist();
        setWishlist(data);
        setLoading(false);
    }

    useEffect(() => {
        getWishlistItems();
    }, []);

    async function removeItem(id) {
        try {
            setGlobalLoading(true); // Start full-screen loading
            await removeFromWhishlist(id);
            let updatedWishlist = wishlist.data.filter(item => item._id !== id);
            setWishlist(updatedWishlist.length ? { ...wishlist, data: updatedWishlist } : { data: [] });
        } catch (error) {
            console.error("Error removing item:", error);
        } finally {
            setGlobalLoading(false); // Stop loading
        }
    }

    async function handleAddToCart(productId) {
        try {
            setGlobalLoading(true); // Start full-screen loading
            let { data } = await addToCart(productId);
            console.log("Added to cart:", data);
            let updatedWishlist = wishlist.data.filter(item => item._id !== productId);
            setWishlist({ ...wishlist, data: updatedWishlist });
        } catch (error) {
            console.error("Error adding to cart:", error);
        } finally {
            setGlobalLoading(false); // Stop loading
        }
    }

    return (
        <main className="bg-white min-h-screen p-10 relative">
            {/* Full-Screen Loading Overlay */}
            {(loading || globalLoading) && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <i className="fa fa-spinner fa-pulse fa-4x fa-fw text-white"></i>
                </div>
            )}

            <section className="w-[90%] mx-auto bg-gray-100 p-8 shadow-lg">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-4xl font-semibold text-black">My Wishlist</h2>
                </div>

                {wishlist && wishlist.data.length > 0 ? (
                    <div className="space-y-6">
                        {wishlist.data.map((product, index) => (
                            <React.Fragment key={index}>
                                <div className="flex justify-between items-center p-4">
                                    <div className="flex items-center space-x-4">
                                        <img
                                            src={product.imageCover}
                                            alt={product.title}
                                            className="w-24 h-24 object-cover rounded-md"
                                        />
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>
                                            <p className="text-gray-600">{product.price} EGP</p>
                                            <button
                                                onClick={() => removeItem(product._id)}
                                                className="text-red-500 cursor-pointer text-sm flex items-center bg-transparent hover:bg-transparent focus:outline-none focus:ring-0"
                                                disabled={globalLoading} // Disable button while loading
                                            >
                                                🗑 Remove
                                            </button>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleAddToCart(product._id)}
                                        className="bg-transparent border border-green-600 text-green-600 py-2 px-4 rounded-lg hover:bg-transparent focus:outline-none focus:ring-0 text-center"
                                        disabled={globalLoading} // Disable button while loading
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                                {index < wishlist.data.length - 1 && <hr className="w-full border-gray-300 my-4" />}
                            </React.Fragment>
                        ))}
                    </div>
                ) : (
                    <h2 className="text-center text-xl text-gray-700 mt-5">Your Wishlist is Empty</h2>
                )}
            </section>
        </main>
    );
}
