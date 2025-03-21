import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineSearch, AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai';
import { dropdownMenu } from '../../data/headerData';
import commonContext from '../../contexts/common/commonContext';
import AccountForm from '../form/AccountForm';
import SearchBar from './SearchBar';
import { UserContext } from '../../contexts/user/userContext';
import { CartContext } from '../../contexts/cart/cartContext';


const Header = () => {

    const { toggleForm, toggleSearch } = useContext(commonContext);
    const { formUserInfo } = useContext(UserContext)
    const { cartQuantity } = useContext(CartContext)
    const [isSticky, setIsSticky] = useState(false);

    // handle the sticky-header
    useEffect(() => {
        const handleIsSticky = () => window.scrollY >= 50 ? setIsSticky(true) : setIsSticky(false);

        window.addEventListener('scroll', handleIsSticky);

        return () => {
            window.removeEventListener('scroll', handleIsSticky);
        };
    }, [isSticky]);

    useEffect(() => {

    })

    const handleLogout = () => {
        localStorage.removeItem('tokenUser');
        localStorage.removeItem('token');  // Xóa thông tin người dùng trong localStorage
        window.location.href = '/';  // Điều hướng về trang chủ hoặc trang khác
    };




    return (
        <>
            <header id="header" className={isSticky ? 'sticky' : ''}>
                <div className="container">
                    <div className="navbar">
                        <h2 className="nav_logo">
                            <Link to="/">HuuDuc</Link>
                        </h2>
                        <nav className="nav_actions">
                            <div className="search_action">
                                <span onClick={() => toggleSearch(true)}>
                                    <AiOutlineSearch />
                                </span>
                                <div className="tooltip">Tìm kiếm</div>
                            </div>

                            <div className="cart_action">
                                <Link to="/cart">
                                    <AiOutlineShoppingCart />
                                    {
                                        cartQuantity > 0 && (
                                            <span className="badge">{cartQuantity}</span>
                                        )
                                    }
                                </Link>
                                <div className="tooltip">Cart</div>
                            </div>

                            <div className="user_action">
                                <span>
                                    <AiOutlineUser />
                                </span>
                                <div className="dropdown_menu">
                                    <h4>Xin chào! {formUserInfo && <Link to="*">&nbsp;{formUserInfo.name}</Link>}</h4>
                                    <p>Truy cập tài khoản và quản lý đơn hàng.</p>
                                    {
                                        !formUserInfo ? (
                                            <button
                                                type="button"
                                                onClick={() => toggleForm(true)}
                                            >
                                                Đăng nhập / Đăng ký
                                            </button>
                                        ) : (
                                            <>
                                                <button
                                                    type="button"
                                                    onClick={() => handleLogout()}
                                                >
                                                    Đăng xuất
                                                </button>
                                                <div className="separator"></div>
                                                <ul>
                                                    <li>
                                                        <Link to="/order">Đơn hàng</Link>
                                                    </li>
                                                    {
                                                        formUserInfo.role === 1 ? (
                                                            <>
                                                                <li>
                                                                    <Link to="/admin/product">Quản lý Sản phẩm</Link>
                                                                </li>
                                                                <li>
                                                                    <Link to="/admin/orders">Quản lý đơn hàng</Link>
                                                                </li>
                                                            </>
                                                        ) : (
                                                            <></>
                                                        )
                                                    }
                                                </ul>
                                            </>
                                        )
                                    }


                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </header>

            <SearchBar />
            <AccountForm />
        </>
    );
};

export default Header;