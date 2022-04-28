import {client} from "../components/App/App";
import {GET_CURRENCIES_LIST} from "../graphql/Queries";

const SET_CART_ITEMS = "SET_CART_ITEMS";
const ADD_ITEM_QUANTITY = "ADD_ITEM_QUANTITY";
const REMOVE_ITEM_QUANTITY = "REMOVE_ITEM_QUANTITY";
const SET_TOTAL_PRICE = "SET_TOTAL_PRICE";
const SET_CURRENCIES_LIST = "SET_CURRENCIES_LIST";
const SET_CURRENT_CURRENCY = "SET_CURRENT_CURRENCY";
const SET_MINI_CART_ACTIVE = "SET_MINI_CART_ACTIVE";
const SET_CURRENCY_BLOCK_ACTIVE = "SET_CURRENCY_BLOCK_ACTIVE";
const SET_SELECTED_OPTIONS = "SET_SELECTED_OPTIONS";
const ON_ORDER_ITEMS = "ON_ORDER_ITEMS";



let initialState = {
    cartItems: [],
    totalPrice: null,
    currenciesList: [],
    currentCurrency: 0,
    isMiniCartActive: false,
    isCurrencyBlockActive: false,
    selectedOptions: []
}

const cartReducer  = (state = initialState, action ) => {
    const item = state.cartItems.find(
        product => product.id === action.id
    );
    switch(action.type) {

        case SET_CURRENCIES_LIST:
            return  {...state, currenciesList: action.currenciesList}

        case SET_CURRENT_CURRENCY:
            return {...state, currentCurrency: action.currentCurrency}

        case SET_MINI_CART_ACTIVE:
            return {...state, isMiniCartActive: action.isMiniCartActive}

        case SET_CURRENCY_BLOCK_ACTIVE:
            return {...state, isCurrencyBlockActive: action.isCurrencyBlockActive}

        case ON_ORDER_ITEMS:
            return {...state, cartItems: []}

        case SET_SELECTED_OPTIONS:

            if (!state.selectedOptions.some(option => (option.id === action.id && option.name === action.name))) {
                return {...state, selectedOptions: [...state.selectedOptions, {value: action.value, name: action.name, id: action.id}]}
            } else {
                return {
                            ...state,
                            selectedOptions: state.selectedOptions.map(option => (option.id === action.id && option.name === action.name)
                                ? {
                                    ...option,
                                    value: action.value

                                }
                                :  option)
                        };
            }

        case SET_CART_ITEMS:
            if(!state.cartItems.some((item) => item.id === action.item.id)) {
                return  {...state, cartItems: [...state.cartItems, action.item]}
            }

            return {...state, cartItems: [...state.cartItems]}

        case SET_TOTAL_PRICE:
            return {...state, totalPrice: action.price}

        case ADD_ITEM_QUANTITY:

            if(item) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((item) => item.id === action.id
                        ? {
                            ...item,
                            quantity: item.quantity + 1,
                            totalPrice: state.totalPrice + item.prices[state.currentCurrency].amount
                        }
                        : item
                    ),

                };
            }
            return {...state, cartItems: [...state.cartItems, action]};

        case REMOVE_ITEM_QUANTITY:
            if (item.quantity === 1) {
                return {
                    ...state, cartItems: state.cartItems.filter((item) => item.id !== action.id),
                    selectedOptions: state.selectedOptions.filter((item) => item.id !== action.id)
                }
            } else {
                return {
                    ...state,
                    cartItems: state.cartItems.map((item) => item.id === action.id
                        ? {
                            ...item,
                            quantity: item.quantity - 1,

                        }
                        : item
                    ),
                }
            }

        default:
            return state;
    }
}



export const setCartItems = (item) => ({type: SET_CART_ITEMS, item});
export const onAddItemQuantity = (id) => ({type: ADD_ITEM_QUANTITY, id});
export const onRemoveItemQuantity = (id) => ({type: REMOVE_ITEM_QUANTITY, id});
export const setTotalPrice = (price) => ({type: SET_TOTAL_PRICE, price});
export const setCurrenciesLIst = (currenciesList) => ({type: SET_CURRENCIES_LIST, currenciesList});
export const setCurrentCurrency = (currentCurrency) => ({type: SET_CURRENT_CURRENCY, currentCurrency});
export const setMiniCartActive = (isMiniCartActive) => ({type: SET_MINI_CART_ACTIVE, isMiniCartActive})
export const setCurrencyBlockActive = (isCurrencyBlockActive) => ({type: SET_CURRENCY_BLOCK_ACTIVE, isCurrencyBlockActive});
export const setSelectedOptions = (name, value, id) => ({type: SET_SELECTED_OPTIONS, name, value, id});
export const onOrderItems = () => ({type: ON_ORDER_ITEMS});

export const getCurrencies = () => {
    return async (dispatch) => {
        let response = await client.query({query: GET_CURRENCIES_LIST});
        dispatch(setCurrenciesLIst(response.data.currencies));
    }
};


export default cartReducer;