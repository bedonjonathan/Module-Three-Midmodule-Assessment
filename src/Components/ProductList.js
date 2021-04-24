import Product from "./Product"
import "./ProductList.css"

const ProductList = ({ productData, addToCart,formatPrice }) => {
  return (
    <section className="Products">
      {productData.map((product) => {
        return <Product key={product.id} product={product} addToCart={addToCart} formatPrice={formatPrice} />;
      })}
    </section>
  );
};

export default ProductList;