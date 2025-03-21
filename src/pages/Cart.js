import React, { useContext, useEffect, useState } from 'react';
import { BsCartX } from 'react-icons/bs';
import { displayMoney } from '../helpers/utils';
import useDocTitle from '../hooks/useDocTitle';
import EmptyView from '../components/common/EmptyView';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { TbTrash } from 'react-icons/tb';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { CartContext } from '../contexts/cart/cartContext';
import { UserContext } from '../contexts/user/userContext';
import commonContext from '../contexts/common/commonContext';
import OrderForm from '../components/form/OrderForm';


const Cart = () => {

    useDocTitle('Cart');
    const api_url = "http://localhost:5000";
    const { userId } = useContext(UserContext)
    const { toggleFormOrder } = useContext(commonContext)
    const { fetchCart } = useContext(CartContext)
    const [cart, setCart] = useState([])


    useEffect(() => {
        if (userId) {
            async function getCart() {
                try {
                    const cartData = await fetchCart(userId)
                    setCart(cartData)
                } catch (error) {
                    console.error("Error fetching cart:", error);
                }
            }
            getCart()
        }
    }, [userId])
    
    const cartQuantity = cart.length;

    function total() {
        let total = 0
        for (let i = 0; i < cart.length; i++) {
            total += cart[i].quantity *
                cart[i].productId.finalPrice
        }          
        return total
    }

    function decrementItem(id) {
        
        axios.post(`${api_url}/cart/decrement/${userId}/${id}`)
            .then((response) => {
                setCart(response.data.items)
                fetchCart(userId)
            })
            .catch((error) => {
                console.error("Error removing item from cart:", error);
            });
    }

    function incrementItem(id) {
        axios.post(`${api_url}/cart/increment/${userId}/${id}`)
            .then((response) => {
                setCart(response.data.items)
                fetchCart(userId)
            })
    }

    function removeItem(id) {
        axios.delete(`${api_url}/cart/${userId}/${id}`)
            .then((response) => {
                setCart(response.data.items);
                fetchCart(userId)
            })
            .catch((error) => {
                console.error("Error removing item from cart:", error);
            });
    }






    const order = () => {
        toggleFormOrder(true)
    }

    

    return (
        <>
            <section id="cart" className="section">
                <div className="container">
                    {
                        cartQuantity === 0 ? (
                            <EmptyView
                                icon={<BsCartX />}
                                msg="Your Cart is Empty"
                                link="/all-products"
                                btnText="Start Shopping"
                            />
                        ) : (
                            <div className="wrapper cart_wrapper">
                                <div className="cart_left_col">
                                    {
                                        cart.map(item => (
                                            <div className="cart_item" key={item._id}>
                                                <div className="cart_item_img">
                                                    <Link to={`/product-details/${item.productId._id}`}>
                                                        <img
                                                            src={`${api_url}/images/${item.productId.images[0]}`}
                                                            alt="product-img"
                                                        />
                                                    </Link>
                                                </div>
                                                <div className="cart_item_info">
                                                    <div className="cart_item_head">
                                                        <h4 className="cart_item_title">
                                                            <Link to={`/product-details/${item.productId._id}`}>
                                                                {item.productId.title || ''}
                                                                {item.productId.info || ''}
                                                            </Link>
                                                        </h4>
                                                        <div className="cart_item_del">
                                                            <span onClick={() => removeItem(item._id)}>
                                                                <TbTrash />
                                                            </span>
                                                            <div className="tooltip">Remove Item</div>
                                                        </div>
                                                    </div>

                                                    <h2 className="cart_item_price">
                                                        {displayMoney(item.productId.finalPrice * item.quantity || '')} &nbsp;
                                                    </h2>
                                                    <div className="quantity_box">
                                                        <button
                                                            type="button"
                                                            onClick={() => decrementItem(item._id)}
                                                        >
                                                            <FaMinus />
                                                        </button>
                                                        <span className="quantity_count">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            type="button"
                                                            onClick={() => incrementItem(item._id)}
                                                        >
                                                            <FaPlus />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>

                                <div className="cart_right_col">
                                    <div className="order_summary">
                                        <h3>
                                        Tóm tắt đơn hàng &nbsp;
                                            ( {cartQuantity} sản phẩm )
                                        </h3>
                                        <div className="order_summary_details">
                                            <div className="price">
                                                <span>Giá gốc</span>
                                                <b>{displayMoney(total())}</b>
                                            </div>
                                            <div className="delivery">
                                                <span>Ship</span>
                                                <b>Miễn phí</b>
                                            </div>
                                            <div className="separator"></div>
                                            <div className="total_price">
                                                <b><small>Tổng tiền</small></b>
                                                <b>{displayMoney(total())}</b>
                                            </div>
                                        </div>
                                        <button onClick={() => order()} className="btn checkout_btn">Đặt hàng</button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </section>

            <OrderForm cart={cart} userId={userId} setCart={setCart} total={total()}/>
        </>
    );
};

export default Cart;