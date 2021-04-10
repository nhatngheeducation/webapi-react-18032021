// src/actions/index.js
import * as Types from '../constants/Types';

//Định nghĩa các Action - thông tin gửi đến reducer
export const actionAddToCart = (product, quantity = 1) => {
    return {
        type: Types.ADD_PRODUCT_TO_CART,
        product,
        quantity
    }
}

export const actionUpdateCart = (product, quantity = 1) => {
    return {
        type: Types.UPDATE_PRODUCT_IN_CART,
        product,
        quantity
    }
}

export const actionRemoveCart = (product) => {
    return {
        type: Types.REMOVE_PRODUCT_OUT_CART,
        product
    }
}