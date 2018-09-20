import React, { Component } from 'react';
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { fetchProducts, fetchCategories, fetchNumPages } from '../actions'

import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

class SearchBar extends Component {
  constructor() {
    super();

    this.state = {
      defaultOption: '',
    }

    this.options = {
      priceSorting: [
        {value: "lowest", label: 'Price: Low to High'},
        {value: "highest", label: 'Price: High to Low'},
      ]
    };

  }

  updateState(key, value){
    let property = {};
    property[key] = value;

    this.setState(property, () => this.fetchData())
  }

  componentDidUpdate(){
    //ugly hack
    if(this.state.currentPage != this.props.currentPage) {
      this.updateState('currentPage', this.props.currentPage);
    }
  }
  fetchData() {
    let filter = {};

    if(this.state.category)
      filter.category = this.state.category.value
    if(this.state.price)
      filter.price = this.state.price.value
    if(this.state.search)
      filter.name = this.state.search
    if(this.props.currentPage)
      filter.page = this.props.currentPage;

    this.props.fetchProducts(filter);
    this.props.fetchNumPages(filter);
    this.props.fetchCategories();
  }



  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <div>
        <div className="search-bar-filter-container">
          search:
          <input onChange={event => this.updateState('search', event.target.value)} type="text"/>
        </div>
        <div className="search-bar-filter-container">
        filter by category:
        <Dropdown options={this.props.categories}
                  onChange={event => this.updateState('category', event)}
                  value={this.state.category} 
                  placeholder="Select a Category" />
        </div>
        <div className="search-bar-filter-container">
        sort by:
        <Dropdown options={this.options.priceSorting}
                  onChange={event => this.updateState('price', event)}
                  value={this.state.price} 
                  placeholder="Select a Price Sort" />
        </div>
      </div>
    );
  }
}

function mapStateToProps({products, categories, currentPage}) {
  return {products, categories, currentPage};
}
 function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchProducts, fetchCategories, fetchNumPages}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
