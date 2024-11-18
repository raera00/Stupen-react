import PropTypes from "prop-types";
import Card from "../Card/Card";

export default function CardList({ products }) {

  if (products.length === 0) {
    return <p className="text-center py-4 col-span-4">No Products.</p>;
  }

  return (
    <>
      {products.map((prod, index) => (
        <Card product={prod} index={index} key={prod.id ?? index} />
      ))}
    </>
  );
}

CardList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
};
