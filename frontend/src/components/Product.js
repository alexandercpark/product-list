import React, { Component } from 'react';

class Product extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <p>Name: {this.props.product.name}</p>
        <p>Category: {this.props.product.category}</p>
        <p>Price: ${this.props.product.price}</p>
        <img src={this.props.product.image} />
      </div>
    );
  }
}

export default Product;
