import React, { Component } from 'react';

class Product extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="product-container">
        <img alt={this.props.product.name} src={this.props.product.image} />
        <div className="product">
          <div className="product-field">Name: {this.props.product.name}</div>
          <div className="product-field">Category: {this.props.product.category}</div>
          <div className="product-field">Price: ${this.props.product.price}</div>
        </div>
      </div>
    );
  }
}

export default Product;
