const Product = ({ product, addToCart,formatPrice }) => {
  return (
    <div>
      <h3>{product.name}</h3>
      <p>Price: {formatPrice(product.price)} </p>
      <button onClick={() => addToCart(product)}>Add To Cart</button>
      <img src={product.img} alt="product"></img>  
      <p>{product.description}</p>   
    </div>
  );
};

export default Product;
