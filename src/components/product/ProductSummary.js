import React, { useContext, useEffect, useState } from 'react';
import useActive from '../../hooks/useActive';
import ProductReviews from './ProductReviews';
import { ProductReviewContext } from '../../contexts/review/productReview';
import { useParams } from 'react-router-dom';


const ProductSummary = (props) => {

    const { brand, title, info, category, type, connectivity } = props;

    const { active, handleActive, activeClass } = useActive('specs');

    const { productReviews, fetchProductReview } = useContext(ProductReviewContext)
    const [reviews, setReviews] = useState([]);
    const { productId } = useParams();

    useEffect(() => {
        async function getProductReview() {
            try {
                const reviewData = await fetchProductReview(productId)
                setReviews(reviewData);
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        }
        getProductReview()
    }, [productId]);

    
    return (
        <>
            <section id="product_summary" className="section">
                <div className="container">

                    {/*===== Product-Summary-Tabs =====*/}
                    <div className="prod_summary_tabs">
                        <ul className="tabs">
                            <li
                                className={`tabs_item ${activeClass('specs')}`}
                                onClick={() => handleActive('specs')}
                            >
                                Thông số kỹ thuật
                            </li>
                            <li
                                className={`tabs_item ${activeClass('overview')}`}
                                onClick={() => handleActive('overview')}
                            >
                                Tổng quan
                            </li>
                            <li
                                className={`tabs_item ${activeClass('reviews')}`}
                                onClick={() => handleActive('reviews')}
                            >
                                Đánh giá
                            </li>
                        </ul>
                    </div>

                    {/*===== Product-Summary-Details =====*/}
                    <div className="prod_summary_details">
                        {
                            active === 'specs' ? (
                                <div className="prod_specs">
                                    <ul>
                                        <li>
                                            <span>Thương hiệu</span>
                                            <span>{brand}</span>
                                        </li>
                                        <li>
                                            <span>Mẫu mã</span>
                                            <span>{title}</span>
                                        </li>
                                        <li>
                                            <span>Loại tai nghe</span>
                                            <span>{type}</span>
                                        </li>
                                        <li>
                                            <span>Kết nối</span>
                                            <span>{connectivity}</span>
                                        </li>
                                        <li>
                                            <span>Microphone</span>
                                            <span>Yes</span>
                                        </li>
                                    </ul>
                                </div>
                            ) : active === 'overview' ? (
                                <div className="prod_overview">
                                    <h3>Sản phẩm <span>{title}</span> {info} cung cấp chất lượng âm thanh tuyệt vời.</h3>
                                    <ul>
                                        <li>Âm thanh được tinh chỉnh hoàn hảo.</li>
                                        <li>Thoải mái khi đeo.</li>
                                        <li>Thời gian phát nhạc lâu dài.</li>
                                    </ul>
                                    <p>Mua ngay <b>{title} {info}</b> mang đến cho bạn một trải nghiệm âm nhạc tuyệt vời với chất lượng âm thanh xuất sắc mà bạn sẽ không thể nào bỏ qua. Tận hưởng sự linh hoạt và di động hoàn hảo cùng chất lượng âm nhạc tuyệt vời, mang đến cho bạn một trải nghiệm âm thanh thực sự ấn tượng. Nó kết hợp chất lượng âm thanh vượt trội với nhiều tính năng thông minh, mang đến trải nghiệm nghe nhạc không đối thủ.</p>
                                </div>
                            ) : (
                                <div className="prod_reviews">
                                    <ul>
                                        {
                                            reviews.map(item => (
                                                <ProductReviews
                                                    key={item.id}
                                                    {...item}
                                                />
                                            ))
                                        }
                                    </ul>
                                </div>
                            )

                        }

                    </div>

                </div>
            </section>
        </>
    );
};

export default ProductSummary;