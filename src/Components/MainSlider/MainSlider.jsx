import React from "react";
import Slider from "react-slick";
import slide1 from "../../assets/images/1.jpg";
import slide2 from "../../assets/images/2.jpg";
import slide3 from "../../assets/images/3.jpg";
import img1 from "../../assets/images/XCM_Manual_1396328_4379575_Egypt_EG_BAU_GW_DC_SL_Bags_Wallets_379x304_1X._SY304_CB650636675_.jpg";
import img2 from "../../assets/images/XCM_Manual_1533480_5305769_379x304_1X._SY304_CB616236518_.jpg";

export default function MainSilder() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false, 
    };

    return (
        <section className="flex justify-center items-center my-6">
            <div className="grid grid-cols-1 md:grid-cols-2 w-full md:w-[50%]">
                <div>
                    <Slider {...settings}>
                        <img src={slide1} className="w-full h-[300px] md:h-[400px] object-cover" alt="" />
                        <img src={slide2} className="w-full h-[300px] md:h-[400px] object-cover" alt="" />
                        <img src={slide3} className="w-full h-[300px] md:h-[400px] object-cover" alt="" />
                    </Slider>
                </div>
                <div className="flex flex-col">
                    <img src={img1} className="w-full h-[150px] md:h-[200px] object-cover" alt="" />
                    <img src={img2} className="w-full h-[150px] md:h-[200px] object-cover" alt="" />
                </div>
            </div>
        </section>
    );
}
