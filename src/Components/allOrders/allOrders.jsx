import React, { useEffect, useState } from 'react'
import { jwtDecode } from "jwt-decode"; 
import axios from 'axios'


export default function Allorders() {
    const [userOrders, setuserOrders] = useState(null)
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("usertoken");
    
        if (token) {
            try {
                let { id } = jwtDecode(token);
                getOrders(id);
            } catch (error) {
                console.error("Invalid token:", error);
                localStorage.removeItem("usertoken"); // Remove invalid token
            }
        } else {
            console.error("No token found in localStorage");
        }
    }, []);
    
    
    async function getOrders(id){
        try {
        let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
        setuserOrders(data)
        
        } catch (error) {
        
        }
    }

    return (
        <div>
        {userOrders === null?
            <div className=" text-center bg-dark vw-100 bg-opacity-10 position-absolute  start-0  vh-100 d-flex flex-column justify-content-center align-items-center ">
            <h2>it seems you don't have any orders yet </h2>
            {loading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <i className="fa fa-spinner fa-pulse fa-4x fa-fw text-white"></i>
                </div>
            )}

            </div>
        :
            <>
            <h1 className='text-center text-main my-4 '>Your Orders</h1>
            <div className="row justify-content-between g-3  ">
                {userOrders.map((order , idx)=>{
                return <div key={idx} className="col-12 bg-main-light rounded-4 p-3 ">
                    <span className='h4 me-3 text-main'>Total Cost: {order.totalOrderPrice} EGP</span>
                    <span className='h4  text-main'>Payment Method: {order.paymentMethodType}</span>
                    <p className='m-0 mt-3'>phone: {order.shippingAddress.phone}</p>
                    <p className='m-0 '>city: {order.shippingAddress.city}</p>
                    <div className='row'>
                    {order.cartItems.map((item , index)=>{
                        return <div key={index} className='col-sm-5 col-md-3 col-xl-2 bg-main text-white rounded-3 p-3 m-2 '>
                        <p className=''>product count : {item.count}</p>
                        <p className=''> price : {item.price} EGP</p>
                        </div>
                    })}
                    </div>
                </div>
                })}
            </div>
            </>
        
        }
        </div>
    )
}