import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'reactstrap';
import { actionRemoveCart } from '../actions/index';
import { useState, useEffect } from 'react';

export const Cart = () => {
    let dispatch = useDispatch();
    const myCartData = useSelector((state) => state.Cart);
    const [myCart, setMyCart] = useState(myCartData);
    console.log("myCart", myCart);

    const handleRemoveCart = (item) => {
        dispatch(actionRemoveCart(item));
    }

    return (
        <div>
            <h2>GIỎ HÀNG</h2>
            <table border="1" cellPadding="5" cellSpacing="0" style={{ margin: '0 auto' }}>
                <tr>
                    <th>Mã</th><th>Tên</th><th>Giá</th><th>Số lượng</th><th>Thành tiền</th><th></th>
                </tr>
                {myCart !== undefined && myCart.map((item) => {
                    const total = item.product.giaBan * item.quantity;
                    return (
                        <tr>
                            <td>{item.product.maHh}</td>
                            <td>{item.product.tenHh}</td>
                            <td>{item.product.giaBan}</td>
                            <td>{item.quantity}</td>
                            <td>{total}</td>
                            <td>
                                <Button color="danger"
                                    onClick={() => handleRemoveCart(item.product)}                                >Xóa!</Button></td>
                        </tr>
                    )
                })
                }
            </table>
        </div>
    );
}