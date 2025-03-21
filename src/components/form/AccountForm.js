import React, { useContext, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import commonContext from '../../contexts/common/commonContext';
import useOutsideClose from '../../hooks/useOutsideClose';
import useScrollDisable from '../../hooks/useScrollDisable';
import axios from 'axios';
import { Toast } from '../alert/toast';

const AccountForm = () => {

    const api_url = 'http://localhost:5000';

    const { isFormOpen, toggleForm } = useContext(commonContext);
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [confPassword, setConfPassword] = useState("")
    const [Message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const formRef = useRef();

    useOutsideClose(formRef, () => {
        toggleForm(false);
    });

    useScrollDisable(isFormOpen);

    const [isSignupVisible, setIsSignupVisible] = useState(false);


    // Signup-form visibility toggling
    const handleIsSignupVisible = () => {
        setIsSignupVisible(prevState => !prevState);
    };

    const register = async (e) => {
        e.preventDefault();

        if (!name || !email || !password || !confPassword) {
            setMessage('Vui lòng điền đầy đủ thông tin!');
            return;
        }

        if (password !== confPassword) {
            setMessage('Mật khẩu và xác nhận mật khẩu không khớp!');
            return;
        }
        setLoading(true);
        setMessage('');
        try {
            const response = await axios.post(`${api_url}/auth/register`, {
                name,
                email,
                password
            })

            // setFormUserInfo(response.data.name)
            toggleForm(false);
            Toast.fire({
                icon: "success",
                title: `Đăng ký thành công`
            })

        } catch (error) {
            setMessage(error.response?.data?.message || 'Đã có lỗi xảy ra!');
            Toast.fire({
                icon: "error",
                title: `Đăng ký thất bại`
            })
        } finally {
            setLoading(false);
        }
    }


    const login = async (e) => {
        e.preventDefault()

        if (!email || !password) {
            setMessage('Vui lòng điền đầy đủ thông tin!');
            return;
        }

        setLoading(true);
        setMessage('');

        try {
            const response = await axios.post(`${api_url}/auth/login`, {
                email,
                password
            })
            Toast.fire({
                icon: "success",
                title: `Đã đăng nhập`
            })
            setMessage(response.data.message);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem('tokenUser', JSON.stringify(response.data.tokenUser));
            toggleForm(false);
            window.location.href = "/";
            

        } catch (error) {
            if (error.response) {
                // Nếu có response từ backend, lấy thông báo lỗi
                setMessage(error.response.data.message || error.response.data.error || "Lỗi không xác định");
            } else if (error.request) {
                // Nếu không nhận được phản hồi từ server (chẳng hạn lỗi mạng)
                setMessage("Không thể kết nối tới máy chủ. Vui lòng thử lại sau.");
            } else {
                // Nếu có lỗi khác (chẳng hạn lỗi trong khi tạo yêu cầu)
                setMessage(error.message || "Lỗi không xác định");
            }
            Toast.fire({
                icon: "error",
                title: `Đăng nhập thất bại`
            })
        } finally {
            setLoading(false);
        }
    }



    return (
        <>
            {
                isFormOpen && (
                    <div className="backdrop">
                        <div className="modal_centered">
                            <form id="account_form" ref={formRef} onSubmit={isSignupVisible ? register : login}>

                                {/*===== Form-Header =====*/}
                                <div className="form_head">
                                    <h2>{isSignupVisible ? 'Đăng ký' : 'Đăng nhập'}</h2>
                                    <p>
                                        {isSignupVisible ? 'Bạn đã có tài khoản ?' : 'Lần đầu vào HuuDuc ?'}
                                        &nbsp;&nbsp;
                                        <button type="button" onClick={handleIsSignupVisible}>
                                            {isSignupVisible ? 'Đăng nhập' : 'Tạo tài khoản'}
                                        </button>
                                    </p>
                                </div>

                                {/*===== Form-Body =====*/}
                                <div className="form_body">
                                    {
                                        isSignupVisible && (
                                            <div className="input_box">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    className="input_field"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}

                                                />
                                                <label className="input_label">Tên người dùng</label>
                                            </div>
                                        )
                                    }

                                    <div className="input_box">
                                        <input
                                            type="email"
                                            name="email"
                                            className="input_field"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}

                                        />
                                        <label className="input_label">Email</label>
                                    </div>

                                    <div className="input_box">
                                        <input
                                            type="password"
                                            name="password"
                                            className="input_field"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}

                                        />
                                        <label className="input_label">Mật khẩu</label>
                                    </div>

                                    {
                                        isSignupVisible && (
                                            <div className="input_box">
                                                <input
                                                    type="password"
                                                    name="conf_password"
                                                    className="input_field"
                                                    value={confPassword}
                                                    onChange={(e) => setConfPassword(e.target.value)}

                                                />
                                                <label className="input_label">Xác nhận mật khẩu</label>
                                            </div>
                                        )
                                    }

                                    <button
                                        type="submit"
                                        className="btn login_btn"
                                    >
                                        {loading ? 'Signing up...' : isSignupVisible ? 'Đăng ký' : 'Đăng nhập'}
                                    </button>

                                    {Message && <div className="error_message ">{Message}</div>}

                                </div>


                                {/*===== Form-Close-Btn =====*/}
                                <div
                                    className="close_btn"
                                    title="Close"
                                    onClick={() => toggleForm(false)}
                                >
                                    &times;
                                </div>

                            </form>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default AccountForm;