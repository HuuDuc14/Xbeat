import React, { useContext, useRef, useState } from "react";
import commonContext from "../../contexts/common/commonContext";
import useOutsideClose from "../../hooks/useOutsideClose";
import { ProductContext } from "../../contexts/product/productContext";
import { Toast } from "../alert/toast";

const FormProduct = () => {
    const { isFormCreate, toggleFormCreate } = useContext(commonContext);
    const { addProduct } = useContext(ProductContext)

    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [finalPrice, setFinalPrice] = useState("");
    const [info, setInfo] = useState("");
    const [quantity, setQuantity] = useState("");
    const [title, setTitle] = useState("");
    const [type, setType] = useState("");
    const [images, setImages] = useState([]);

    const formRef = useRef();
    useOutsideClose(formRef, () => {
        toggleFormCreate(false);
    });

    // imagePreview
    const [selectedImage, setSelectedImage] = useState([]);
    const previewImage = (event) => {
        const files = event.target.files;
        if (files) {
            const imageUrls = Array.from(files).map(file => URL.createObjectURL(file));
            setSelectedImage(imageUrls);
            setImages(files)
        }
    };

    const resetForm = () => {
        setBrand("")
        setCategory("")
        setFinalPrice("")
        setImages([])
        setInfo("")
        setQuantity("")
        setTitle("")
        setType("")
        setSelectedImage([])
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('category', category);
        formData.append('brand', brand);
        formData.append('info', info);
        formData.append('type', type);
        formData.append('finalPrice', finalPrice);
        formData.append('quantity', quantity);
        if (images.length > 0) {
            Array.from(images).forEach((file) => {
                formData.append('images', file);
            });
        }
        try {
            const response = await addProduct(formData)           
            toggleFormCreate(false);
            Toast.fire({
                icon: "success",
                title: `${response.message}`
            });
            resetForm()
        } catch (error) {
            toggleFormCreate(true)
            Toast.fire({
                icon: "error",
                title: `Thêm sản phẩm không thành công`
            });            
        }
    };


    return (
        <>
            {isFormCreate && (
                <div className="backdrop">
                    <div className="modal_centered">
                        <form id="form_product" ref={formRef} onSubmit={handleSubmit} encType="multipart/form-data">
                            {/*===== Form-Header =====*/}
                            <div className="form_head">
                                <h2>Thêm sản phẩm</h2>
                            </div>

                            {/*===== Form-Body =====*/}
                            <div className="form_body">
                                <div className="input_box">
                                    <input
                                        type="text"
                                        className="input_field"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                    <label className="input_label">Tên sản phẩm</label>
                                </div>

                                <div className="row">
                                    <div className="col-4">
                                        <div className="input_box">
                                            <input
                                                type="text"
                                                className="input_field"
                                                value={brand}
                                                onChange={(e) => setBrand(e.target.value)}
                                            />
                                            <label className="input_label">Hãng</label>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="input_box">
                                            <select
                                                className="input_field"
                                                value={type}
                                                onChange={(e) => setType(e.target.value)}
                                            >
                                                <option>-- Chọn kiểu dáng --</option>
                                                <option value="Over Ear">Over Ear</option>
                                                <option value="In Ear">In Ear</option>
                                                <option value="On Ear">On Ear</option>
                                            </select>
                                            <label className="input_label">Kiểu</label>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="input_box">
                                            <select
                                                className="input_field"
                                                value={category}
                                                onChange={(e) => setCategory(e.target.value)}
                                            >
                                                <option>-- Chọn danh mục --</option>
                                                <option value="Headphones">Headphones</option>
                                                <option value="Earphones">Earphones</option>
                                                <option value="Neckbands">Neckbands</option>
                                            </select>
                                            <label className="input_label">Danh mục</label>
                                        </div>
                                    </div>
                                </div>

                                {/*  */}
                                <div className="input_box">
                                    <span className="status">Hình ảnh:</span>
                                    <div className="row">
                                        <div className="col-6">
                                            <label htmlFor="file" className="labelFile">
                                                <span>
                                                    <svg
                                                        xmlSpace="preserve"
                                                        viewBox="0 0 184.69 184.69"
                                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        id="Capa_1"
                                                        version="1.1"
                                                        width="60px"
                                                        height="60px"
                                                    >
                                                        <g>
                                                            <g>
                                                                <g>
                                                                    <path
                                                                        d="M149.968,50.186c-8.017-14.308-23.796-22.515-40.717-19.813
                      C102.609,16.43,88.713,7.576,73.087,7.576c-22.117,0-40.112,17.994-40.112,40.115c0,0.913,0.036,1.854,0.118,2.834
                      C14.004,54.875,0,72.11,0,91.959c0,23.456,19.082,42.535,42.538,42.535h33.623v-7.025H42.538
                      c-19.583,0-35.509-15.929-35.509-35.509c0-17.526,13.084-32.621,30.442-35.105c0.931-0.132,1.768-0.633,2.326-1.392
                      c0.555-0.755,0.795-1.704,0.644-2.63c-0.297-1.904-0.447-3.582-0.447-5.139c0-18.249,14.852-33.094,33.094-33.094
                      c13.703,0,25.789,8.26,30.803,21.04c0.63,1.621,2.351,2.534,4.058,2.14c15.425-3.568,29.919,3.883,36.604,17.168
                      c0.508,1.027,1.503,1.736,2.641,1.897c17.368,2.473,30.481,17.569,30.481,35.112c0,19.58-15.937,35.509-35.52,35.509H97.391
                      v7.025h44.761c23.459,0,42.538-19.079,42.538-42.535C184.69,71.545,169.884,53.901,149.968,50.186z"
                                                                        style={{ fill: "#010002" }}
                                                                    />
                                                                </g>
                                                                <g>
                                                                    <path
                                                                        d="M108.586,90.201c1.406-1.403,1.406-3.672,0-5.075L88.541,65.078
                      c-0.701-0.698-1.614-1.045-2.534-1.045l-0.064,0.011c-0.018,0-0.036-0.011-0.054-0.011c-0.931,0-1.85,0.361-2.534,1.045
                      L63.31,85.127c-1.403,1.403-1.403,3.672,0,5.075c1.403,1.406,3.672,1.406,5.075,0L82.296,76.29v97.227
                      c0,1.99,1.603,3.597,3.593,3.597c1.979,0,3.59-1.607,3.59-3.597V76.165l14.033,14.036
                      C104.91,91.608,107.183,91.608,108.586,90.201z"
                                                                        style={{ fill: "#010002" }}
                                                                    />
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </svg>
                                                </span>
                                                <p>
                                                    Drag and drop your file here or click to select a
                                                    file!
                                                </p>
                                            </label>
                                            <input
                                                className="input-image"
                                                id="file"
                                                type="file"
                                                multiple
                                                onChange={previewImage}
                                            />
                                        </div>
                                        <div className="col-6">
                                            {/* Hiển thị ảnh preview */}
                                            <div className="imagePreview" >
                                                {selectedImage && selectedImage.map((image, i) => (
                                                    <img
                                                        key={i}
                                                        src={image}
                                                        alt="Preview"
                                                    />
                                                ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/*  */}
                                <div className="row">
                                    <div className="col-5">
                                        <div className="input_box">
                                            <input
                                                type="number"
                                                className="input_field"
                                                value={quantity}
                                                onChange={(e) => setQuantity(e.target.value)}
                                            />
                                            <label className="input_label">Số lượng</label>
                                        </div>
                                    </div>
                                    <div className="col-7">
                                        <div className="input_box">
                                            <input
                                                type="number"
                                                name="password"
                                                className="input_field"
                                                value={finalPrice}
                                                onChange={(e) => setFinalPrice(e.target.value)}
                                            />
                                            <label className="input_label">Giá</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="input_box">
                                    <label>Mô tả:</label>
                                    <textarea
                                        className="input_field"
                                        value={info}
                                        onChange={(e) => setInfo(e.target.value)}
                                    />
                                </div>

                                <button type="submit" className="btn login_btn">
                                    Thêm
                                </button>
                            </div>

                            {/*===== Form-Close-Btn =====*/}
                            <div
                                className="close_btn"
                                title="Close"
                                onClick={() => toggleFormCreate(false)}
                            >
                                &times;
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default FormProduct;
