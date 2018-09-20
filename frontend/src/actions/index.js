import axios from "axios"

const ROOT_URL = "http://localhost:8000"

export const FETCH_PRODUCTS = "FETCH_PRODUCTS"
export const FETCH_CATEGORIES = "FETCH_CATEGORIES"

export function fetchProducts(query = {}) {
  let queryParams = []
  for(var key in query)
    //only look at the object, do not look at its
    //prototype
    if (query.hasOwnProperty(key))
      queryParams.push(key + "=" + query[key])
  
  let url = ROOT_URL + '/products' + (queryParams.length > 0 ? '?' + queryParams.join('&') : '')
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