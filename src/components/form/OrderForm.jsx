import { useContext, useEffect, useRef, useState } from "react";
import commonContext from "../../contexts/common/commonContext";
import useOutsideClose from "../../hooks/useOutsideClose";
import { AddressContext } from "../../contexts/address/addressContext";
import { OrderContext } from "../../contexts/order/orderContext";
import { Toast } from "../alert/toast";
import { CartContext } from "../../contexts/cart/cartContext";
import { useNavigate } from "react-router-dom";

const OrderForm = ({ cart, userId, setCart, total }) => {
    const navigate = useNavigate()

    const { isFormOrder, toggleFormOrder } = useContext(commonContext);
    const { getProvince, getDistrict, getWard } = useContext(AddressContext)
    const { order } = useContext(OrderContext)
    const { clearCart, fetchCart } = useContext(CartContext)

    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')

    const [provinces, setProvinces] = useState([])
    const [selectedProvince, setSelectedProvince] = useState('');
    const [districts, setDistricts] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState('')
    const [wards, setWards] = useState([])
    const [selectedWard, setSelectedWard] = useState('')

    const formRef = useRef();
    useOutsideClose(formRef, () => {
        toggleFormOrder(false);
    })
    
    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const response = await getProvince()
                setProvinces(response)
            } catch (error) {
                console.error("Lỗi khi lấy tỉnh");
            }
        }
        fetchProvinces()
    }, [])

    useEffect(() => {
        if (selectedProvince) {
            const fetchDistricts = async () => {
                try {
                    const response = await getDistrict(selectedProvince)
                    setDistricts(response)
                } catch (error) {
                    console.error("Lỗi khi lấy huyện");
                }
            }
            fetchDistricts()
        }
    }, [selectedProvince])

    useEffect(() => {
        if (selectedDistrict) {
            const fetchWards = async () => {
                try {
                    const response = await getWard(selectedDistrict)
                    setWards(response)
                } catch (error) {
                    console.error("Lỗi khi lấy xã");
                }
            }
            fetchWards()
        }

    }, [selectedDistrict])

    const handleOrder = async (e) => {
        e.preventDefault()

        const orderData = {
            name: name,
            phone: phone,
            provinceCode: selectedProvince,
            districtCode: selectedDistrict,
            wardCode: selectedWard,
            address: address,
            cart: cart,
            total: total
        };
        

        try {
            const response = await order(userId, orderData)
            toggleFormOrder(false)
            clearCart(userId)
            setCart([])
            fetchCart(userId)
            navigate('/')
            Toast.fire({
                icon: "success",
                title: `${response.message}`
            })
        } catch (error) {

            console.log("Lỗi: ", error);
            
            toggleFormOrder(true)
            Toast.fire({
                icon: "error",
                title: `Đặt hàng không thành công`
            });
        }
    }


    return (
        isFormOrder && (
            <div className="backdrop">
                <div className="modal_centered">
                    <form id="form_product" ref={formRef} onSubmit={handleOrder}>
                        <div className="form_head">
                            <h2>Điền thông tin đặt hàng</h2>
                        </div>
                        <div className="form_body">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="input_box">
                                        <input
                                            type="text"
                                            className="input_field"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                        <label className="input_label">Tên người nhận</label>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="input_box">
                                        <input
                                            type="number"
                                            className="input_field"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                        <label className="input_label">Số điện thoại</label>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-4">
                                    <div className="input_box">
                                        <select
                                            className="input_field select"
                                            value={selectedProvince}
                                            onChange={(e) => setSelectedProvince(e.target.value)}
                                        >
                                            <option>-- Chọn Tỉnh --</option>

                                            {provinces?.map((province) => (
                                                <option key={province.code} value={province.code}>{province.name}</option>
                                            ))}
                                        </select>
                                        <label className="input_label">Tỉnh</label>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="input_box">
                                        <select
                                            className="input_field select"
                                            value={selectedDistrict}
                                            onChange={(e) => setSelectedDistrict(e.target.value)}
                                        >
                                            <option>-- Chọn Huyện --</option>

                                            {districts.map((district) => (
                                                <option key={district.code} value={district.code}>
                                                    {district.name}
                                                </option>
                                            ))}
                                        </select>
                                        <label className="input_label">Huyện</label>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="input_box">
                                        <select
                                            className="input_field select"
                                            value={selectedWard}
                                            onChange={(e) => setSelectedWard(e.target.value)}
                                        >
                                            <option>-- Chọn Xã --</option>
                                            {wards?.map((ward) => (
                                                <option key={ward.code} value={ward.code}>{ward.name}</option>
                                            ))}
                                        </select>
                                        <label className="input_label">Xã</label>
                                    </div>
                                </div>
                            </div>
                            <div className="input_box">
                                <input
                                    type="text"
                                    className="input_field"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                                <label className="input_label">Số nhà/ Đường</label>
                            </div>

                            <button type="submit" className="btn login_btn">
                                Đặt hàng
                            </button>

                        </div>
                        <div
                            className="close_btn"
                            title="Close"
                            onClick={() => toggleFormOrder(false)}
                        >
                            &times;
                        </div>
                    </form>
                </div>
            </div>
        )
    );
};

export default OrderForm;
