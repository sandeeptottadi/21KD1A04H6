import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";

export default function ProductData() {
  interface Products {
    id: number;
    productName: string;
    price: number;
    rating: string;
    discount: string;
    availability: string;
  }
  const [projectData, setProjectData] = useState<Products | null>(null);

  useEffect(() => {
    const data = localStorage.getItem("productData");
    if (data) {
      setProjectData(JSON.parse(data));
    }
  }, []);

  return (
    <>
      <Navbar />
      <div>
        {projectData ? (
          <div
            key={projectData.id}
            className="bg-white shadow-md rounded-lg p-6 m-4 w-3/4"
          >
            <h2 className="text-2xl font-bold mb-4">
              {projectData.productName}
            </h2>
            <p className="text-gray-700 mb-2">
              <strong>Availability:</strong> {projectData.availability}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Discount:</strong> {projectData.discount}%
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Rating:</strong> {projectData.rating} / 5
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Price:</strong> ${projectData.price}
            </p>
            <p className="text-gray-700">
              <strong>ID:</strong> {projectData.id}
            </p>
          </div>
        ) : (
          <p>No project data available</p>
        )}
      </div>
    </>
  );
}
