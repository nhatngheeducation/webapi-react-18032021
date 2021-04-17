// src/reducers/GioHangReducer.js
//Xử lý cập nhật state mới dựa vào action gửi qua + state cũ
import * as Types from '../constants/Types';
const initCartValue = [];

let index = -1;
export const Cart = (state = initCartValue, action) => {
    console.log("Action: ", action);
    var { product, quantity } = action;
    switch (action.type) {
        case Types.ADD_PRODUCT_TO_CART:
            index = findProductInCart(state, product.maHh);
            if (index > -1) {
                state[index].quantity += quantity;
            } else {
                state.push({ product, quantity });
            }
            console.log(state);
            return state;
        case Types.UPDATE_PRODUCT_IN_CART:
            index = findProductInCart(state, product.maHh);
            if (index > -1) {
                state[index].quantity = quantity;
            } 
            return state;
        case Types.REMOVE_PRODUCT_OUT_CART:
            index = findProductInCart(state, product.maHh);
            if (index > -1) {
                state.slice(index, 1);
            }
            return state;
        default: return state;
    }
}

const findProductInCart = (cart, productId) => {
    let index = -1;
    if (cart.length > 0) {
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].product.maHh === productId) {
                index = i;
                break;
            }
        }
    }
    return index;
}


//export default Cart;