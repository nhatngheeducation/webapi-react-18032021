import { useSelector } from 'react-redux';

export const Cart = () => {
    let myCart = useSelector((state) => state.Cart);
    console.log("myCart", myCart);
    return (
        <div>
            <h2>GIỎ HÀNG</h2>
            <table border="1" cellPadding="5" cellSpacing="0" style={{ margin:'0 auto' }}>
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
                            <td>X</td>
                        </tr>
                    )
                })
                }
            </table>
        </div>
    );
}