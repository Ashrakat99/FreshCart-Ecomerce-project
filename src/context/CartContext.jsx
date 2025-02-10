import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext();

export default function CartContextProvider(props) {
    const [countt, setCountt] = useState(0);
    const [wishcount, setWishCount] = useState(0);

    function getHeaders() {
        return {
        token: localStorage.getItem("userToken"),
        };
    }

    async function addToCart(productId) {
        try {
        let headers = getHeaders();
        let response = await axios.post(
            `https://ecommerce.routemisr.com/api/v1/cart`,
            { productId },
            { headers }
        );
        await getCartItem();
        return response;
        } catch (err) {
        console.error("Add to Cart Error:", err);
        }
    }

    async function getCartItem() {
        try {
        let headers = getHeaders();
        let response = await axios.get(
            `https://ecommerce.routemisr.com/api/v1/cart`,
            { headers }
        );
        setCountt(response.data.numOfCartItems || 0);
        return response;
        } catch (err) {
        console.error("Get Cart Items Error:", err);
        }
    }

    async function deleteCartItem(productId) {
        try {
        let headers = getHeaders();
        let response = await axios.delete(
            `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            { headers }
        );
        await getCartItem();
        return response;
        } catch (err) {
        console.error("Delete Cart Item Error:", err);
        }
    }

    async function updateCartItem(productId, count) {
        try {
        let headers = getHeaders();
        let response = await axios.put(
            `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            { count },
            { headers }
        );
        await getCartItem();
        return response;
        } catch (err) {
        console.error("Update Cart Item Error:", err);
        }
    }

    async function getWhishlist() {
        try {
        let headers = getHeaders();
        let response = await axios.get(
            `https://ecommerce.routemisr.com/api/v1/wishlist`,
            { headers }
        );
        setWishCount(response.data.count || 0);
        return response;
        } catch (err) {
        console.error("Get Wishlist Error:", err);
        }
    }

    async function addToWhishlist(productId) {
        try {
        let headers = getHeaders();
        let response = await axios.post(
            `https://ecommerce.routemisr.com/api/v1/wishlist`,
            { productId },
            { headers }
        );
        await getWhishlist();
        return response;
        } catch (err) {
        console.error("Add to Wishlist Error:", err);
        }
    }

    async function removeFromWhishlist(productId) {
        try {
        let headers = getHeaders();
        let response = await axios.delete(
            `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
            { headers }
        );
        await getWhishlist();
        return response;
        } catch (err) {
        console.error("Remove from Wishlist Error:", err);
        }
    }

    function checkOut(cartId, url, formValue) {
        let headers = getHeaders(); // Fix: Use dynamic headers
        return axios
        .post(
            `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
            { shippingAddress: formValue },
            { headers }
        )
        .then((response) => response)
        .catch((error) => error);
    }

    useEffect(() => {
        if (localStorage.getItem("userToken")) {
        getCartItem();
        getWhishlist();
        }
    }, []);

    return (
        <CartContext.Provider
        value={{
            checkOut,
            addToCart,
            getCartItem,
            deleteCartItem,
            updateCartItem,
            countt,
            setCountt,
            getWhishlist,
            addToWhishlist,
            removeFromWhishlist,
            wishcount,
            setWishCount,
        }}
        >
        {props.children}
        </CartContext.Provider>
    );
    }