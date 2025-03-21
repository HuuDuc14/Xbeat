import React, { useContext, useRef, useState } from "react";
import commonContext from "../../contexts/common/commonContext";
import useOutsideClose from "../../hooks/useOutsideClose";
import axios from "axios";
import { UserContext } from "../../contexts/user/userContext";
import { Toast } from "../alert/toast";
import { ProductReviewContext } from "../../contexts/review/productReview";

const ProductReviewForm = ({ product }) => {
    const api_url = "http://localhost:5000";
    const { isProductReview, toggleProductReview } = useContext(commonContext);
    const { userId } = useContext(UserContext)
    const { review } = useContext(ProductReviewContext)
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(1);

    const formRef = useRef();
    useOutsideClose(formRef, () => {
        toggleProductReview(false);
    });

    const handleRatingChange = (value) => {
        setRating(value);
    };
    


    const handleReview = async (e) => {
        e.preventDefault()

        const reviewData = {
            product: product.productId._id,
            rateCount: rating,
            comment: comment
        };

        try {
            const response = await review(userId, reviewData)
            toggleProductReview(false)
            Toast.fire({
                icon: "success",
                title: `${response.message}`
            })

            setComment("")
            setRating(1)
        } catch (error) {
            console.log("Lỗi: ", error);
            
            toggleProductReview(true)
            Toast.fire({
                icon: "error",
                title: `Đánh giá không thành công`
            });
        }

    }

    return (
        isProductReview && (
            <div className="backdrop">
                <div className="modal_centered">
                    {
                        <form id="form_product" ref={formRef} onSubmit={handleReview}>
                            <div className="cart_item" key={product._id}>
                                <div className="cart_item_img">
                                    <img
                                        src={`${api_url}/images/${product.productId.images[0]}`}
                                        alt="product-img"
                                    />
                                </div>
                                <div className="cart_item_info">
                                    <div className="cart_item_head">
                                        <h4 className="cart_item_title">
                                            {product.productId.title || ""}
                                            {product.productId.info || ""}
                                        </h4>
                                        <div className="cart_item_del">
                                            <button className="bt bt_orange" type="submit">Đánh giá</button>
                                        </div>
                                    </div>
                                    <div className="rating">
                                        {[5, 4, 3, 2, 1].map((value) => (
                                            <React.Fragment key={value}>
                                                <input
                                                    value={value}
                                                    name="rate"
                                                    id={`star${value}`}
                                                    type="radio"
                                                    checked={rating === value}
                                                    onChange={() => handleRatingChange(value)}
                                                />
                                                <label htmlFor={`star${value}`} />
                                            </React.Fragment>
                                        ))}
                                    </div>
                                    <div className="input_box">
                                        <textarea
                                            className="input_field"
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                    }
                </div>
            </div>
        )
    );
};

export default ProductReviewForm;
