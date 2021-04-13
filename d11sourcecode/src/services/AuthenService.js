// src/services/AuthenService.js
import axios from 'axios';
const AUTHEN_API = "https://localhost:44325/api/authen/";

const login = (username, password) => {
    return axios.post(AUTHEN_API + "login", { username, password })
        .then(response => {
            //status 200
            console.log(response.data);
            console.log(response.data.success);
            if (response.data.success === true) {
                console.log("SUCESS AND SET LOCALSTORAGE")
                localStorage.setItem("user", response.data.data);                
            }
            return response.data;
        })
        .catch(err => { console.log(err); });
}

const register = (data) => {

}

const logout = () => {
    localStorage.removeItem("user");
}
export const AuthenService = {
    login, logout, register
}

