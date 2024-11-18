import { useState, useEffect } from "react";
import getAllProducts from "../../services/getAllProducts";
import CardList from "../../components/CardList/CardList";
import Navbar from "../../components/Navbar/Navbar";
import RadioButton from "../../components/RadioButton/RadioButton";

export default function ProductPage() {
  const [products, setProducts] = useState([]); // All products
  const [filteredProducts, setFilteredProducts] = useState([]); // Filtered products
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const allProducts = getAllProducts();
    setProducts(allProducts);
    setFilteredProducts(allProducts);
  }, []);

  const RadioButtonOpts = [
    { label: "All", value: "all" },
    { label: "Shoulder Bag", value: "Shoulder Bag" },
    { label: "Sling Bag", value: "Sling Bag" },
    { label: "Hand Bag", value: "Hand Bag" },
    { label: "Backpack", value: "Backpack" },
  ];

  const handleFilterChange = (value) => {
    console.log('Selected category:', value); // Cek nilai kategori
    setSelectedCategory(value);
    applyFilters(value, searchQuery); // Apply category and search filters together
  };
  

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    applyFilters(selectedCategory, query); // Apply category and search filters together
  };  

  
  const applyFilters = (category, query) => {
    let filtered = products;

    if (category !== "all") {
      filtered = filtered.filter((product) => product.category === category);
    }

    if (query) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  return (
    <>
      <Navbar onSearch={handleSearchChange} />
      <div className="px-24 py-4 gap-4 mt-4 flex-wrap">
        <h3 className="font-medium">Filter</h3>
        <div className="flex gap-2 flex-wrap">
          <RadioButton options={RadioButtonOpts} defaultValue="all" onChange={handleFilterChange} />
        </div>
      </div>
      <section className="container px-24 py-4">
        <main className="grid grid-cols-4 gap-4">
          <CardList products={filteredProducts} />
        </main>
      </section>
    </>
  );
}
