const Cart = ({ subTotal, tax, total, cartList, formatPrice }) => {  
  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {cartList.map((product) => {
          return (
            <li key={product.id}>
              {product.name}: {formatPrice(product.price)}
            </li>
          );
        })}
      </ul>
      <h3>Subtotal: {formatPrice(subTotal)}</h3>
      <h3>Tax: {formatPrice(tax)}</h3>
      <h3>Total: {formatPrice(total)}</h3>
    </div>
  );
};
export default Cart;
