import axios from "axios"

const ROOT_URL = "http://localhost:8000"

export const FETCH_PRODUCTS = "FETCH_PRODUCTS"
export const FETCH_CATEGORIES = "FETCH_CATEGORIES"
export const FETCH_NUM_PAGES = "FETCH_NUM_PAGES"
export const SET_PAGE = "SET_PAGE"


function _buildFilterOptions(query) {
  let queryParams = []
  for(var key in query)
    //only look at the object, do not look at its
    //prototype
    if (query.hasOwnProperty(key))
      queryParams.push(key + "=" + query[key])
  
  return queryParams.length > 0 ? '?' + queryParams.join('&') : '';
}

export function fetchProducts(query = {}) {
  let queryUrl = _buildFilterOptions(query);
  
  let url = ROOT_URL + '/products' + queryUrl
  const request = axios.get(url, {headers: { "Content-Type" : "application/json"}})

  return {
    type: FETCH_PRODUCTS,
    payload: request
  };
}

export function fetchCategories() {
  
  let url = ROOT_URL + '/products/categories';
  const request = axios.get(url, {headers: { "Content-Type" : "application/json"}})

  return {
    type: FETCH_CATEGORIES,
    payload: request
  };
}

export function fetchNumPages(query = {}) {
  let queryUrl = _buildFilterOptions(query);

  let url = ROOT_URL + '/products/pages' + queryUrl;
  const request = axios.get(url, {headers: { "Content-Type" : "application/json"}})

  return {
    type: FETCH_NUM_PAGES,
    payload: request
  };
}

export function setCurrentPage(page) {
  return {
    type: SET_PAGE,
    payload: page
  }
}