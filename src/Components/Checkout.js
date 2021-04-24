import React from "react";
class Checkout extends React.Component {
  state = { name: "", lastName: "", email: "", creditCard: "", zipCode: "" };

  updateState = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  checkSubmit = (e) => {
    e.preventDefault();
    const { name, lastName, email, zipCode, creditCard } = this.state;
    const { total, formatPrice } = this.props;
    debugger;
    if (name === "" || lastName === "" || email === "") {
      alert("Input is not valid");
    } else if (zipCode === "" || zipCode.length !== 5) {
      alert("Zip code is not valid");
    } else if (creditCard === "" || creditCard.length !== 16) {
      alert("Credit card number is not valid");
    } else {
      alert(`Purchase complete.
       Your tottal is ${formatPrice(total)}`);
    }
  };

  render() {
    const { name, lastName, email, creditCard, zipCode } = this.state;
    return (
      <form onSubmit={this.checkSubmit}>
        <h2>Checkout</h2>
        <label htmlFor="name">First Name</label>
        <input
          id={"name"}
          value={name}
          name="name"
          onChange={this.updateState}
        ></input>
        <label htmlFor="lastName">Last Name</label>
        <input
          id={"lastName"}
          value={lastName}
          name="lastName"
          onChange={this.updateState}
        ></input>
        <label htmlFor="email">Email</label>
        <input
          id={"email"}
          value={email}
          name="email"
          onChange={this.updateState}
        ></input>
        <label htmlFor="creditCard">Credit Card</label>
        <input
          id={"creditCard"}
          value={creditCard}
          name="creditCard"
          onChange={this.updateState}
        ></input>
        <label htmlFor="zipCode">Zip Code</label>
        <input
          id={"zipCode"}
          value={zipCode}
          name="zipCode"
          onChange={this.updateState}
        ></input>
        <button type="submit">Buy Now</button>
      </form>
    );
  }
}

export default Checkout;
