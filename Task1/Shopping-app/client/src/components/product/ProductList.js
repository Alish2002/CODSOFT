import React, { useState } from 'react';

const ProductList = ({ products }) => {
  const [filters, setFilters] = useState({
    price: '',
    brand: '',
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const filteredProducts = products.filter((product) => {
    if (filters.price && product.price !== filters.price) {
      return false;
    }
    if (filters.brand && product.brand !== filters.brand) {
      return false;
    }
    return true;
  });

  return (
    <div>
      <h2>Product List</h2>
      <div>
        <label>
          Price:
          <select name="price" value={filters.price} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
        <label>
          Brand:
          <select name="brand" value={filters.brand} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="Campus">Campus</option>
            <option value="Bersache">Bersache</option>
            <option value="Nike">Nike</option>
            <option value="Adidas">Adidas</option>
            <option value="Puma">Puma</option>
            <option value="Brooks">Brooks</option>
          </select>
        </label>
      </div>
      <ul>
        {filteredProducts.map((product) => (
          <li key={product.id}>
            {product.name} - {product.price} - {product.brand}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
