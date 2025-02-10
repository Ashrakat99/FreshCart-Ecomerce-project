import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);

  async function getBrands() {
    try {
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
      setBrands(data.data);
    } catch (error) {
      console.error("Error fetching brands:", error);
    } finally {
      setLoading(false);
    }
  }

  async function getBrandDetails(id) {
    setModalLoading(true);
    try {
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
      setSelectedBrand(data.data);
    } catch (error) {
      console.error("Error fetching brand details:", error);
    } finally {
      setModalLoading(false);
    }
  }

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <>
      <Helmet>
        <title>Brands</title>
      </Helmet>

      {loading ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <i className="fa fa-spinner fa-pulse fa-4x fa-fw text-white"></i>
        </div>
      ) : (
        <>
          <h1 className="text-main text-center mb-12 text-4xl m-3">All Brands</h1>
          <div className="w-[80%] mx-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-6 px-4">
            {brands.map((brand, idx) => (
              <div
                key={idx}
                onClick={() => getBrandDetails(brand._id)}
                className="border border-gray-400 p-4 flex flex-col items-center bg-white rounded-lg transform transition-all duration-300 hover:scale-105 hover:border-[var(--main-color)] hover:shadow-2xl cursor-pointer"
              >
                <img className="w-full max-h-40 object-contain" src={brand.image} alt={brand.name} />
                <h3 className="text-center mt-4">{brand.name}</h3>
              </div>
            ))}
          </div>
        </>
      )}

      {modalLoading && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <i className="fa fa-spinner fa-pulse fa-4x fa-fw text-white"></i>
              </div>
      )}


      {selectedBrand && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-[450px] shadow-lg relative border border-gray-300">
            <div className="flex justify-end  border-b border-gray-300">
              <button
                onClick={() => setSelectedBrand(null)}
                className="text-4xl bg-transparent border-0 font-bold text-gray-500 hover:text-gray-700 hover:bg-transparent focus:outline-none focus:ring-0" 
              >
                ×
              </button>
            </div>

            {modalLoading ? (
              <div className="flex items-center justify-center py-6">
                <i className="fa fa-spinner fa-pulse fa-4x fa-fw text-black"></i>
              </div>
            ) : (
              <div className="w-[80%] mx-auto flex items-center justify-between gap-4 py-8">
                <div>
                  <h2 className="text-3xl font-bold text-green-600">{selectedBrand.name}</h2>
                  <p className="text-gray-500">{selectedBrand.slug}</p>
                </div>
                <img className="w-28 h-20 object-contain" src={selectedBrand.image} alt={selectedBrand.name} />
              </div>
            )}
            <div className="border-t border-gray-300 pt-3 flex justify-end">
              <button
                onClick={() => setSelectedBrand(null)}
                className="bg-gray-500 text-white px-4 mr-4 mb-2 py-2 rounded-md hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
