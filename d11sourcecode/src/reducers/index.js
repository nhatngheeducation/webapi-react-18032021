// src/reducers/index.js
import { combineReducers } from 'redux';
import { Cart } from './GioHangReducer'

const appReducers = combineReducers({
    Cart
});
export default appReducers;