import {client} from "../components/App/App";
import {GET_REQUESTED_PRODUCT} from "../graphql/Queries";
import {GET_CATEGORIES_LIST} from "../graphql/Queries";
import {GET_REQUESTED_CATEGORY_PRODUCTS} from "../graphql/Queries";


const SET_CATEGORIES_LIST = "SET_CATEGORIES_LIST";
const SET_CURRENT_CATEGORY = "SET_CURRENT_CATEGORY";
const SET_REQUESTED_PRODUCT = "SET_REQUESTED_PRODUCT";
const SET_REQUESTED_CATEGORY_PRODUCTS = "SET_REQUESTED_CATEGORY_PRODUCTS";


let initialState = {
    allProducts: [],
    clothesProducts: [],
    techProducts: [],
    categoriesList: [],
    currentCategory: "",
    requestedProduct: null,
    requestedCategoryProducts: []
}


const productsReducer  = (state = initialState, action ) => {

    switch(action.type) {
        case SET_REQUESTED_CATEGORY_PRODUCTS:
            return {...state, requestedCategoryProducts: action.products}

        case SET_CATEGORIES_LIST:
            return {...state, categoriesList: action.categoriesList}

        case SET_CURRENT_CATEGORY:
            return {...state, currentCategory: action.currentCategory}

        case SET_REQUESTED_PRODUCT:
            return  {...state, requestedProduct: action.requestedProduct}

        default:
            return state;
    }
}



export const setCurrentCategory = (currentCategory) => ({type: SET_CURRENT_CATEGORY, currentCategory});
export const setRequestedProduct = (requestedProduct) => ({type: SET_REQUESTED_PRODUCT, requestedProduct});
export const setCategoriesLIst = (categoriesList) => ({type: SET_CATEGORIES_LIST, categoriesList});
export const setRequestedCategoryProducts = (products) => ({type: SET_REQUESTED_CATEGORY_PRODUCTS, products});





export const getRequestedCategoryProducts = (name) => {
    return async (dispatch) => {
        let response = await  client.query({query: GET_REQUESTED_CATEGORY_PRODUCTS, variables: {categoryName: name}});
        dispatch(setRequestedCategoryProducts(response.data.category.products));
        dispatch(setCurrentCategory(response.data.name));
    }
}


export const getRequestedProduct = (id) => {
    return async  (dispatch) => {
        let response = await client.query({query: GET_REQUESTED_PRODUCT, variables: {productId: id} });
            dispatch(setRequestedProduct(response.data.product));
    }
};

export const getCategories = () => {
    return async (dispatch) => {
        let response = await client.query({query: GET_CATEGORIES_LIST});
            dispatch(setCategoriesLIst(response.data))
    }
};



export default productsReducer;
