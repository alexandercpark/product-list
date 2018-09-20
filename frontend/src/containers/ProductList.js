import React, { Component } from 'react';
import { connect } from "react-redux"

import Product from '../components/Product';

class ProductList extends Component {

  render() {
    return (
      <div>
        {
          this.props.products.map(product => 
            <Product product={product} key={product._id}/>
          )
        }
      </div>
    );
  }
}

function mapStateToProps({products}) {
  return {products};
}

export default connect(mapStateToProps)(ProductList);
