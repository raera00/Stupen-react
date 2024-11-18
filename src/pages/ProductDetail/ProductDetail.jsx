import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button/Button";
import formatToIDRCurrency from "../../utils/formatToIDRCurrency";
import getAllProducts from "../../services/getAllProducts";

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState();

  useEffect(() => {
    const allProducts = getAllProducts();
    const product = allProducts.find((prod) => prod.slug === slug);
    setProduct(product);
  }, [slug]);

  if (!product) {
    return (
      <>
        <h1 className="flex w-full h-full text-center items-center justify-center text-4xl text-pink-600">
          PRODUCT NOT FOUND.
        </h1>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex px-4 sm:px-8 md:px-24 py-4 gap-[48px] items-center">
        <Link to="/">
          <FontAwesomeIcon icon={faArrowLeftLong} className="mb-0 text-[30px] sm:text-[40px]" />
        </Link>
        <h4 className="text-[24px] sm:text-[32px] font-medium">{product.name ?? 'No Label'}</h4>
      </div>

      <div className="flex flex-col sm:flex-row gap-8 px-4 sm:px-8 md:px-24">
        {/* Gambar Produk */}
        <div className="w-full sm:w-[40%]">
          <img
            src={product.imageUrl ?? (product.name ?? 'No Name')}
            alt={product.name ?? 'No Name'}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Deskripsi dan Detail Produk */}
        <div className="flex flex-col gap-4 sm:w-[60%]">
          <span className="text-2xl sm:text-3xl font-medium">
            {formatToIDRCurrency(product.price) ?? `Not For Sale`}
          </span>
          {product.stock > 0 ? (
            product.stock <= 25 ? (
              <span className="font-medium text-yellow-500">Available, almost out of stock</span>
            ) : (
              <span className="font-medium text-green-500">Available</span>
            )
          ) : (
            <span className="font-medium text-red-500">Out of stock</span>
          )}

          <span className="text-grey-800">{product.category ?? 'Uncategorized'}</span>

          {/* Button Add to Cart */}
          <div className="flex justify-start">
            <Button
              type="button"
              className={`inline-flex items-center justify-center gap-2 p-2 sm:p-3 md:p-4 text-center text-white ${
                product.stock <= 0
                  ? "bg-gray-400 hover:bg-gray-400 cursor-not-allowed" // Out of stock: abu-abu dan non-aktif
                  : "bg-[#6173E6] hover:bg-[#5969cf] active:bg-[#4956ab]"
              }`}
              disabled={product.stock <= 0} // Menonaktifkan tombol jika out of stock
            >
              <FontAwesomeIcon icon={faCartShopping} className="mb-0 text-white text-lg sm:text-xl md:text-2xl" />
              <span className="text-sm sm:text-base md:text-lg">
                {product.stock <= 0 ? "Out of stock" : "Add to cart"}
              </span>
            </Button>
          </div>

          <span className="font-medium">Description</span>
          <p className="max-w-[500px] sm:max-w-full">{product.description ?? 'No description.'}</p>
        </div>
      </div>
    </>
  );
}
