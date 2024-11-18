import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import Button from "../Button/Button";
import PropTypes from "prop-types";
import formatToIDRCurrency from "../../utils/formatToIDRCurrency";
import { Link } from "react-router-dom";

export default function Card({ product }) {
  return (
    <Link
      to={`/products/${product.slug}` ?? ''}
      className="flex flex-col w-full max-w-[370px] sm:max-w-[300px] p-4 bg-[#081116] hover:ring-opacity-40 active:ring-5 active:ring-[#6247eb] hover:ring-4 active:ring-2 active:ring-opacity-90"
    >
      <div className="flex flex-col p-4 bg-[#081116]">
        {/* Gambar Responsif */}
        <img
          src={product.imageUrl ?? ''}
          alt={product.name ?? 'No name'}
          className="block w-full h-auto max-h-[250px] sm:max-h-[300px] mb-4 object-cover"
        />
        
        <div className="flex flex-col gap-2">
          {/* Nama Produk */}
          <h4 className="font-medium text-xl sm:text-2xl text-white">{product.name ?? 'No Name'}</h4>
          
          {/* Kategori Produk */}
          <span className="block font-medium text-sm sm:text-base text-[#eaeaea]">{product.category ?? 'Uncategorized'}</span>
          
          {/* Harga Produk */}
          <span className="block font-medium text-lg sm:text-xl text-white">{formatToIDRCurrency(product.price) ?? 'Not for sale'}</span>
          
          <div className="flex flex-col items-center mt-2">
            {/* Kondisi Stok */}
            {product.stock <= 0 ? (
              <p className="text-xl font-semibold text-center text-red-500">Out of Stock</p>
            ) : product.stock <= 25 && product.stock !== 0 ? (
              <>
                <p className="text-xl font-semibold text-center text-yellow-500">Almost Sold Out</p>
                {/* Tombol Add to Cart */}
                <Button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 p-3 sm:p-4 bg-[#6173E6] text-center hover:bg-[#5969cf] text-white active:bg-[#4956ab] w-full"
                >
                  <FontAwesomeIcon icon={faCartShopping} className="mb-0" />
                  <span>Add to cart</span>
                </Button>
              </>
            ) : (
              <Button
                type="button"
                className="inline-flex items-center justify-center gap-2 p-3 sm:p-4 bg-[#6173E6] text-center hover:bg-[#5969cf] text-white active:bg-[#4956ab] w-full"
              >
                <FontAwesomeIcon icon={faCartShopping} className="mb-0" />
                <span>Add to cart</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

Card.propTypes = {
  product: PropTypes.object,
};
