// src/components/MyRoute.js
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode';

export const MyRoute = ({ component: Component, path, isPrivate, ...rest }) => {
    const isUserLogged = useSelector((state) => state.User.isLoggedIn);
    const tokenData = useSelector((state) => state.User.token);
    if (tokenData != null) {
        console.log(tokenData.token);
        //const decoded = jwt_decode(tokenData, { header: true });
        //console.log("token here: ", decoded);
    }
    
    return (
        <Route
            path={path}
            render={(props) =>
                isPrivate && !isUserLogged
                    ? (
                        <Redirect to={{ pathname: '/login' }} />
                    ) : (
                        <Component {...props} />
                    )
            }
            {...rest}
        />
    )
}