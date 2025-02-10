import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function CategoriesSlider() {
    const sliderRef = useRef(null);
    const [categories, setCategories] = useState([]);

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 6, 
        arrows: false,
        dots: false,
        responsive: [
            {
                breakpoint: 1024, 
                settings: { slidesToShow: 4 },
            },
            {
                breakpoint: 768, 
                settings: { slidesToShow: 2 },
            },
        ],
    };

    async function getCategories() {
        try {
            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
            setCategories(data.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    }

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <div className="relative w-full">
            {categories.length > 0 ? (
                <Slider ref={(slider) => (sliderRef.current = slider)} {...settings}>
                    {categories.map((category, index) => (
                        <div key={index} className="my-3 px-2">
                            <img src={category.image} alt={category.name} className="w-full h-[250px] object-cover rounded-lg" />
                            <h3 className='text-center font-semibold text-xl mt-2'>{category.name}</h3>
                        </div>
                    ))}
                </Slider>
            ) : (
                <p className="text-center text-gray-500">Loading categories...</p>
            )}

            
            <div className="flex justify-center mt-4 space-x-4">
                <button
                    onClick={() => sliderRef.current?.slickPrev()}
                    className="w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400 transition-all rounded-full flex items-center justify-center text-gray-700 outline-none focus:outline-none  focus:ring-0 focus:ring-transparent"
                >
                    
                </button>
                <button
                    onClick={() => sliderRef.current?.slickNext()}
                    className="w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400 transition-all rounded-full flex items-center justify-center text-gray-700 outline-none focus:outline-none  focus:ring-0 focus:ring-transparent"
                >
                    
                </button>
            </div>
        </div>
    );
}