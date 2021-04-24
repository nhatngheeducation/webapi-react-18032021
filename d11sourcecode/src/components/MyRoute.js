// src/components/MyRoute.js

import { Redirect, Route } from 'react-router-dom';

export const MyRoute = ({ component: Component, path, isPrivate, ...rest }) => {
    return (
        <Route
            path={path}
            render={(props) =>
                isPrivate // && chua dang nhap
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