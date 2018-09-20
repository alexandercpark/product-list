import React, { Component } from 'react';
import { connect } from "react-redux"

import { bindActionCreators } from "redux"
import { setCurrentPage } from '../actions'

import Product from '../components/Product';

class ProductList extends Component {

  setCurrentPage(pageNumber) {
    console.log(pageNumber);
    this.props.setCurrentPage(pageNumber);
  }

  render() {

    let pages = [];
    for(let i = 1; i < this.props.numPages + 1; i++) {
      pages.push(
        <span className={i == this.props.currentPage ? "page selectedPage" : "page"}
              onClick={() => this.setCurrentPage(i)}
              key={i}>
          {i}
        </span>);
    }
    console.log(this.props, pages);

    return (
      <div>
        {
          this.props.products.map(product => 
            <Product product={product} key={product._id}/>
          )
        }
        page:
        {
          pages
        }
      </div>
    );
  }
}

function mapStateToProps({products, numPages, currentPage}) {
  return {products, numPages, currentPage};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({setCurrentPage}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
