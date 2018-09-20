import React, { Component } from 'react';
import './App.css';

import SearchBar from './containers/SearchBar'
import ProductList from './containers/ProductList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <p>mockup</p>
        <SearchBar />
        <ProductList />
      </div>
    );
  }
}

export default App;