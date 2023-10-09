import { useState } from "react";
import "./App.css";

function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">{category}</th>
    </tr>
  );
}

function ProductRow({ product }) {
  const { name, price, stocked } = product;
  const nameElement = stocked ? (
    name
  ) : (
    <span style={{ color: "red" }}>{name}</span>
  );
  return (
    <tr>
      <td>{nameElement}</td>
      <td>{price}</td>
    </tr>
  );
}

function ProductTable({ products, filterText, stockedOnly }) {
  const header = (
    <tr>
      <th>Name</th>
      <th>Price</th>
    </tr>
  );
  const rows = [];
  let lastCat = null;
  products.forEach((product) => {
    const { category } = product;
    if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1 || (stockedOnly && !product.stocked)) {
      return;
    }
    if (category !== lastCat) {
      rows.push(
        <ProductCategoryRow category={category} key={product.category} />
      );
      lastCat = category;
    }

    rows.push(<ProductRow product={product} key={product.name} />);
  });
  return (
    <table>
      <thead>{header}</thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar({ filterText, stockedOnly, onFilterTextChange, onStockedOnlyChange }) {
  return (
    <form>
      <div>
        <input type="text" placeholder="Search..." value={filterText} onChange={event => onFilterTextChange(event.target.value)} />
      </div>
      <div>
        <label>
          <input type="checkbox" checked={stockedOnly} onChange={event => onStockedOnlyChange(event.target.checked)} /> Only show products in
          stock
        </label>
      </div>
    </form>
  );
}

function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState("");
  const [stockedOnly, setStockedOnly] = useState("");
  return (
    <div style={{ width: 250 }}>
      <SearchBar filterText={filterText} stockedOnly={stockedOnly} onFilterTextChange={setFilterText} onStockedOnlyChange={setStockedOnly} />
      <ProductTable
        products={products}
        filterText={filterText}
        stockedOnly={stockedOnly}
      />
    </div>
  );
}

const PRODUCTS = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
];

export default function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}
