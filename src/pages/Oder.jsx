import React, { useContext, useEffect, useState } from "react";
import useDocTitle from "../hooks/useDocTitle";
import SectionsHead from "../components/common/SectionsHead";
import { UserContext } from "../contexts/user/userContext";
import { OrderContext } from "../contexts/order/orderContext";
import EmptyView from "../components/common/EmptyView";
import { BsCartX } from "react-icons/bs";
import { Toast } from "../components/alert/toast";
import { Link } from "react-router-dom";
import commonContext from "../contexts/common/commonContext";
import ProductReviewForm from "../components/form/ProductReviewForm";

const Order = () => {
    useDocTitle("Order");

    const [orders, setOrders] = useState(null);
    const { userId } = useContext(UserContext);
    const { fetchOrder, updateStatus } = useContext(OrderContext);
    const { toggleProductReview } = useContext(commonContext)

    const [productReview, setProductReview] = useState(null)

    useEffect(() => {
        if (userId) {
            async function getOrder() {
                try {
                    const fetchedOrder = await fetchOrder(userId);
                    setOrders(fetchedOrder);
                } catch (error) {
                    console.error("Lỗi khi lấy Đơn hàng:", error);
                }
            }
            getOrder();
        }
    }, [userId, fetchOrder]);

    if (orders === null) {
        return <div>Loading...</div>;
    }

    const handeUpdateStatus = async (orderId, status) => {
        try {
            const response = await updateStatus(orderId, status)
            setOrders(prevOrders => {
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

    const review = (item) => {
        setProductReview(item)
        toggleProductReview(true)
    }

    return (
        <>
            <div className="container section">
                {orders.length === 0 ? (
                    <EmptyView
                        icon={<BsCartX />}
                        msg="Bạn chưa có đơn hàng nào"
                        link="/all-products"
                        btnText="Start Shopping"
                    />
                ) : (
                    <>
                        <SectionsHead heading="Đơn hàng của bạn" />
                        <div className="table-wrapper">
                            <table className="table" cellPadding="5" cellSpacing="0">
                                <thead>
                                    <tr>
                                        <th style={{ width: "300px" }}>Mã đơn hàng</th>
                                        <th>Sản Phẩm</th>
                                        <th>Số lượng</th>
                                        <th>Đánh giá</th>
                                        <th>Ngày đặt</th>
                                        <th>Trạng thái</th>
                                        <th>Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => (
                                        <React.Fragment key={order._id}>
                                            <tr>
                                                <td rowSpan={order.items.length + 1}>{order._id}</td>
                                            </tr>
                                            {order.items.map((item, index) => (
                                                <tr key={item._id}>
                                                    <td>
                                                        <Link to={`/product-details/${item.productId._id}`}>
                                                            {item.productId.title}
                                                        </Link>
                                                    </td>
                                                    <td>{item.quantity}

                                                    </td>
                                                    <td>
                                                        {
                                                            order.status === "Đã nhận" && (
                                                                <button className="bt bt_orange" onClick={() => review(item)} >Đánh giá</button>
                                                            )
                                                        }
                                                    </td>


                                                    {index === 0 && (
                                                        <>
                                                            <td rowSpan={order.items.length}>
                                                                {new Date(order.createdAt).toLocaleString(
                                                                    "vi-VN"
                                                                )}
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
                                                                        <button className="bt bt_danger" onClick={() => handeUpdateStatus(order._id, "Đã hủy")}>Hủy đơn hàng</button>
                                                                    ) : order.status === 'Đang giao' ? (
                                                                        <button className="bt bt_success" onClick={() => handeUpdateStatus(order._id, "Đã nhận")}>Đã nhận</button>
                                                                    ) : order.status === 'Đã hủy' ? (
                                                                        <button className="bt bt_primary" onClick={() => handeUpdateStatus(order._id, "Chờ xác nhận")}>Mua lại</button>
                                                                    ) : null
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
            <ProductReviewForm product={productReview} />
        </>
    );
};

export default Order;
