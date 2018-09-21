import React, { Component } from 'react';

class Product extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="product-container">
          <span className="product-field">Category: {this.props.product.category}</span>
          <span className="product-field">${this.props.product.price}</span>
          <img alt={this.props.product.name} src={this.props.product.image} />
          <div className="product-field">{this.props.product.name}</div>
      </div>
    );
  }
}

export default Product;
