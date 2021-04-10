// src/reducers/GioHangReducer.js
//Xử lý cập nhật state mới dựa vào action gửi qua + state cũ
import * as Types from '../constants/Types';

let data = localStorage.getItem("GIOHANG");

let initCartValue = data ? data : [];

const Cart = (state = initCartValue, action) => {
    var { product, quantity } = action;
    switch (action.type) {
        case Types.ADD_PRODUCT_TO_CART:
            let index = findProductInCart(state, product);
            if (index > -1) {
                state[index].quantity += quantity;
            } else {
                state.push({ product, quantity });
            }            
            return [...state];
            break;
        case Types.UPDATE_PRODUCT_IN_CART:
            let index = findProductInCart(state, product);
            if (index > -1) {
                state[index].quantity = quantity;
            } 
            return [...state];
            break;
        case Types.REMOVE_PRODUCT_OUT_CART:
            let index = findProductInCart(state, product);
            if (index > -1) {
                state.slice(index, 1);
            }
            return [...state];
            break;
        default: return state; break;
    }
}

const findProductInCart = (cart, productId) => {
    let index = -1;
    if (cart.length > 0) {
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].product.id === productId) {
                index = i;
                break;
            }
        }
    }
    return index;
}

const addToCart = (product, quantity) => { }
const updateCart = (product, quantity) => { }
const removeProductOutCart = (product) => { }


export default Cart;