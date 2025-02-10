import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);

  async function getCategories() {
    try {
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
      setCategories(data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  }

  async function getCategoryDetails(id) {
    setModalLoading(true);
    setSelectedCategory(null); 
    try {
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`);
      setSelectedCategory(data.data);
    } catch (error) {
      console.error("Error fetching category details:", error);
    } finally {
      setModalLoading(false);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <Helmet>
        <title>Categories</title>
      </Helmet>

      {loading ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <i className="fa fa-spinner fa-pulse fa-4x fa-fw text-white"></i>
        </div>
      ) : (
        <>
          <h1 className="text-main text-center mb-12 text-4xl m-3">All Categories</h1>
          <div className="w-[80%] mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 px-4">
            {categories.map((category, idx) => (
              <div
                key={idx}
                onClick={() => getCategoryDetails(category._id)}
                className="w-full border border-gray-400 flex flex-col items-center bg-white rounded-lg transform transition-all duration-300 hover:scale-105 hover:border-[var(--main-color)] hover:shadow-2xl cursor-pointer"
              >
                <img className="w-full h-[300px] object-cover" src={category.image} alt={category.name} />
                <h3 className="text-center mt-4">{category.name}</h3>
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

      {selectedCategory && !modalLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-[450px] shadow-lg relative border border-gray-300">
            <div className="flex justify-end border-b border-gray-300">
              <button
                onClick={() => setSelectedCategory(null)}
                className="text-4xl bg-transparent border-0 font-bold text-gray-500 hover:text-gray-700 hover:bg-transparent focus:outline-none focus:ring-0"
              >
                ×
              </button>
            </div>

            <div className="w-[80%] mx-auto flex items-center justify-between gap-4 py-8">
              <div>
                <h2 className="text-3xl font-bold text-green-600">{selectedCategory.name}</h2>
                <p className="text-gray-500">{selectedCategory.slug}</p>
              </div>
              <img className="w-28 h-20 object-contain" src={selectedCategory.image} alt={selectedCategory.name} />
            </div>

            <div className="border-t border-gray-300 pt-3 flex justify-end">
              <button
                onClick={() => setSelectedCategory(null)}
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
