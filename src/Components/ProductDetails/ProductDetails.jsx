import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export default function ProductDetails() {
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState({}); 

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000,
        customPaging: (i) => (
            <div className="w-5 h-1 bg-gray-300 rounded-[40%] mx-1"></div>
        )
    };

    let { id } = useParams();

    async function getProduct(productId) {
        try {
            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`);
            setProduct(data.data);
        } catch (error) {
            console.error("Error fetching product:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (id) {
            getProduct(id);
        }
    }, [id]); 

    return (
        <>
            {loading ? (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <i className="fa fa-spinner fa-pulse fa-4x fa-fw text-white"></i>
                </div>
            ) : (
                <div className="w-[90%] vh-100 flex items-center p-8">
                    <div className='w-1/3'>
                        <Slider {...settings}>
                            {product.images?.map((image, index) => (
                                <img src={image} className="w-full" alt={product.title} key={index} />
                            ))}
                        </Slider>
                    </div>
                    <div className='w-2/3 p-6'>
                        <h2 className='text-3xl mb-2 font-bold'>{product.title}</h2>
                        <p className="text-lg text-gray-600 ">Product Description: {product.description}</p>
                        <p className="text-lg mb-2">{product.category?.name || "No Category"}</p>
                        <div className='flex justify-between'>   
                            <span>{product.price} EGP</span>
                            <span><i className='fa fa-star rating-color'></i>{product.ratingsAverage} </span>
                        </div>
                        <button className='btn w-full'>Add to Cart</button>
                    </div>
                </div>
            )}
        </>
    );
}
