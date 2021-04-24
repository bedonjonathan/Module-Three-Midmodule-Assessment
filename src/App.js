import React from "react";
import ProductList from "./Components/ProductList";
import Cart from "./Components/Cart";
import Checkout from "./Components/Checkout";
import productData from "./data/productData";
import formatPrice from "./helpers/formatPrice";
import "./App.css";

class App extends React.Component {
  state = { subTotal: 0, tax: 0, total: 0, cartList: [] };
  addToCart = (product) => {
    //I seperated the updated of each state because if i have them all under 
    //one setState method there is a an out of sync
    this.setState((prevState) => ({
      cartList: [product, ...prevState.cartList], subTotal: prevState.subTotal + product.price
    }));
    this.setState((prevState) => ({
      tax: prevState.subTotal * 0.05,
    }));
    this.setState((prevState)=>({
      total: prevState.subTotal + prevState.tax
    }))
  };
  render() {
    const { subTotal, tax, total, cartList } = this.state;
    return (
      <div className="App">
        <div className="left-side">
          <h2>My Garage Sale</h2>
          <ProductList
            productData={productData}
            addToCart={this.addToCart}
            formatPrice={formatPrice}
          />
        </div>
        <div className="right-side">
          <Cart
            subTotal={subTotal}
            tax={tax}
            total={total}
            cartList={cartList}
            formatPrice={formatPrice}
          />
          <Checkout total={total} formatPrice={formatPrice} />
        </div>
      </div>
    );
  }
}

export default App;
