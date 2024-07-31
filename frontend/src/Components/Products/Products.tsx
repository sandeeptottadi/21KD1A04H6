import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductSkeleton from "../Products_Skeleton/ProductsSkeleton";
import { Link } from "react-router-dom";

export default function Products() {
  interface Products {
    id: number;
    productName: string;
    price: number;
    rating: string;
    discount: string;
    availability: string;
  }
  const [company, setCompany] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [n, setN] = useState(10);
  const [page, setPage] = useState(1);
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(10000);
  const [products, setProducts] = useState<Products[]>([]);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const companyParam = queryParams.get("company");
    const categoryParam = queryParams.get("category");
    const nParam = queryParams.get("n");
    const minParam = queryParams.get("min");
    const maxParam = queryParams.get("max");

    if (companyParam) setCompany(companyParam);
    if (categoryParam) setCategory(categoryParam);
    if (nParam) setN(Number(nParam));
    if (min) setMin(Number(minParam));
    if (max) setMax(Number(maxParam));
  }, [location.search]);

  useEffect(() => {
    if (company && category) {
      fetch("http://localhost:8080/get_products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          companyName: company,
          category: category,
          minPrice: min,
          maxPrice: max,
          n: n,
          //   isAvailable: true,
          //   discount: 100,
          //   rating: 4,
        }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then((data: Products[]) => {
          setProducts(data);
        })
        .catch((e) => {
          console.error("Fetch error:", e);
        });
    }
  }, [company, category, n, page, min, max]); // Add n and page to the dependency array

  return (
    <div className="mt-12 w-full flex flex-col items-center">
      {products.length === 0 && (
        <div>
          <ProductSkeleton />
        </div>
      )}
      {products.map((product) => {
        return (
          <Link
            to={`/product/${product.id}`}
            key={product.id}
            className="bg-white shadow-md rounded-lg p-6 m-4 w-3/4 cursor-pointer"
          >
            <div className="text-lg font-bold mb-2">{product.productName}</div>
            <div className="text-gray-700 mb-2">Price: ${product.price}</div>
            <div className="text-gray-700 mb-2">
              Rating: {product.rating} / 5
            </div>
            <div className="text-gray-700 mb-2">
              Discount: {product.discount}%
            </div>
            <div className="text-gray-700">
              Availability: {product.availability}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
