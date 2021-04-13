// src/services/AuthenHeader.js

export const authenHeader = () => {
    const userToken = localStorage.getItem("user");
    if (userToken) {
        return { Authorization: 'Bearer ' + userToken }
    } else {
        return {}
    }
}