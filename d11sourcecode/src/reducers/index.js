// src/reducers/index.js
import { combineReducers } from 'redux';
import { Cart } from './GioHangReducer'

export const appReducers = combineReducers({
    Cart
});
//export default appReducers;