import React, { useContext, useEffect, useState } from "react";
import SectionsHead from "../../../components/common/SectionsHead";
import useDocTitle from "../../../hooks/useDocTitle";
import { OrderContext } from "../../../contexts/order/orderContext";
import { UserContext } from "../../../contexts/user/userContext";
import EmptyView from "../../../components/common/EmptyView";
import { BsCartX } from "react-icons/bs";
import { Link } from "react-router-dom";
import { displayMoney } from "../../../helpers/utils";
import { Toast } from "../../../components/alert/toast";


const ManageOrder = () => {
    useDocTitle("Admin Orders");

    const { getAllOrder, updateStatus } = useContext(OrderContext)
    const { userId } = useContext(UserContext)

    const [allOrder, setAllOrder] = useState([])

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await getAllOrder()
                setAllOrder(response)
            } catch (error) {
                console.error("Lỗi khi lấy tất cả đơn hàng: ", error);
            }
        }
        fetchOrders()
    }, [userId])

    const handeUpdateStatus = async (orderId, status) => {
        try {
            const response = await updateStatus(orderId, status)
            setAllOrder(prevOrders => {
                return prevOrders.map(order =>
                    order._id === orderId ? { ...order, status } : order
                )
            })
            Toast.fire({
                icon: "success",
                title: `${response.message}`
            })
        } catch (error) {
            Toast.fire({
                icon: "error",
                title: `Hủy đơn hàng không thành công`
            });
        }
    }

    return (
        <>
            <div className="container section">
                {allOrder.length === 0 ? (
                    <EmptyView
                        icon={<BsCartX />}
                        msg="Chưa có đơn hàng nào"
                        link="/all-products"
                        btnText="Start Shopping"
                    />
                ) : (
                    <>
                        <SectionsHead heading="Tất cả đơn hàng" />
                        <div className="table-wrapper">
                            <table className="table" cellPadding="5" cellSpacing="0">
                                <thead>
                                    <tr>
                                        <th>Người nhận</th>
                                        <th>Sản Phẩm</th>
                                        <th>Số lượng</th>
                                        <th>Tổng tiền</th>
                                        <th>Trạng thái</th>
                                        <th>Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allOrder.map((order) => (
                                        <React.Fragment key={order._id}>
                                            <tr>
                                                <td rowSpan={order.items.length + 1} style={{ textAlign: "left" }}>
                                                    <p>Tên: {order.name}</p>
                                                    <p style={{ margin: "7px 0" }}>SĐT: {order.phone}</p>
                                                    <p>Địa chỉ: {order.address}, {order.wardData.name}, {order.districtData.name}, {order.provinceData.name}</p>
                                                </td>
                                            </tr>
                                            {order.items.map((item, index) => (
                                                <tr key={item._id}>
                                                    <td>
                                                        <Link to={`/product-details/${item.productId._id}`}>
                                                            {item.productId.title}
                                                        </Link>
                                                    </td>
                                                    <td>{item.quantity}</td>
                                                    {index === 0 && (
                                                        <>
                                                            <td rowSpan={order.items.length}>
                                                                <h4>{displayMoney(order.total)}</h4>
                                                            </td>
                                                            <td rowSpan={order.items.length}>
                                                                <span className={`status 
                                                                    ${order.status === "Chờ xác nhận" ? "status_warning" :
                                                                        order.status === "Đã hủy" ? "status_danger" :
                                                                            order.status === "Đang giao" ? "status_primary" :
                                                                                order.status === "Đã nhận" ? "status_success" : ""
                                                                    }`}>
                                                                    {order.status}
                                                                </span>
                                                            </td>
                                                            <td rowSpan={order.items.length}>
                                                                {
                                                                    order.status === "Chờ xác nhận" ? (
                                                                        <button className="bt bt_primary" onClick={() => handeUpdateStatus(order._id, "Đang giao")}>Giao hàng</button>
                                                                    ) : order.status === 'Đang giao' ? (
                                                                        <button className="bt bt_success" onClick={() => handeUpdateStatus(order._id, "Đã nhận")}>Đã nhận</button>
                                                                    ) :  null
                                                                }
                                                            </td>
                                                        </>
                                                    )}
                                                </tr>
                                            ))}
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </div>

        </>
    )
}

export default ManageOrder