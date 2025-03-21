import React, { useContext } from 'react';
import { IoMdStar } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { displayMoney } from '../../helpers/utils';
import useActive from '../../hooks/useActive';
import { CartContext } from '../../contexts/cart/cartContext';
import { UserContext } from '../../contexts/user/userContext';
import { ToastCenter } from '../alert/toast';


const ProductCard = (props) => {

    const api_url = 'http://localhost:5000'

    const { _id, images, title, info, finalPrice, rateCount} = props;

    const { addToCart } = useContext(CartContext)
    const { userId } = useContext(UserContext)

    const { active, handleActive, activeClass } = useActive(false);


    // handling Add-to-cart
    const handleAddItem = (productId) => {

        if (!userId) {
            ToastCenter.fire({
                icon: "info",
                title: `Vui lòng đăng nhập trước khi đặt hàng`
            })
        } else {         
            addToCart(userId, productId)

            handleActive(_id);

            setTimeout(() => {
                handleActive(false);
            }, 3000);
        };
    }



    const newPrice = displayMoney(finalPrice);


    return (
        <>
            <div className="card products_card">
                <figure className="products_img">
                    <Link to={`/product-details/${_id}`}>
                        <img src={`${api_url}/images/${images[0]}`} alt="product-img" />
                    </Link>
                </figure>
                <div className="products_details">                   
                    <h3 className="products_title">
                        <Link to={`/product-details/${_id}`}>{title}</Link>
                    </h3>
                    <h5 className="products_info">{info}</h5>
                    <div className="separator"></div>
                    <h2 className="products_price">
                        {newPrice} &nbsp;
                    </h2>
                    <button
                        type="button"
                        className={`btn products_btn ${activeClass(_id)}`}
                        onClick={() => handleAddItem(_id)}
                    >
                        {active ? 'Added' : 'Add to cart'}
                    </button>
                </div>
            </div>
        </>
    );
};

export default ProductCard;