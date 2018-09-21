import React, { Component } from 'react';
import { connect } from "react-redux"

import Product from '../components/Product';

class ProductList extends Component {

  render() {

    return (
      <div className="product-list-container">
        <div>
          {
            this.props.products.map(product => 
              <Product product={product} key={product._id}/>
            )
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps({productMetadata}) {
  return {
    products: productMetadata.products || []
  };
}

export default connect(mapStateToProps)(ProductList);
