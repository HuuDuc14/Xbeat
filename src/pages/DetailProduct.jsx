import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useDocTitle from "../hooks/useDocTitle";
import { IoMdCheckmark, IoMdStar } from "react-icons/io";
import { displayMoney } from "../helpers/utils";
import ProductSummary from "../components/product/ProductSummary";
import { ProductContext } from "../contexts/product/productContext";
import { CartContext } from "../contexts/cart/cartContext";
import { UserContext } from "../contexts/user/userContext";
import { ToastCenter } from "../components/alert/toast";

const DetailProduct = () => {
    const api_url = "http://localhost:5000";
    useDocTitle("Product Details");

    const {getProductDetail} = useContext(ProductContext)
    const { addToCart } = useContext(CartContext)
    const { userId } = useContext(UserContext)

    const [product, setProduct] = useState(null);
    const { productId } = useParams();

    useEffect(() => {
        async function fetchProduct() {
            try {
                const productData = await getProductDetail(productId);
                setProduct(productData);
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        }


        fetchProduct();
    }, [productId]);
    

    const [previewImg, setPreviewImg] = useState(null);

    useEffect(() => {
        if (product && product.product.images && product.product.images.length > 0) {
            setPreviewImg(product.product.images[0]); // Gán ảnh đầu tiên từ product nếu có
        }
    }, [product]);

    const handlePreviewImg = (i) => {
        if (product.product && product.product.images[i]) {
            setPreviewImg(product.product.images[i]);
        }
    };

    const [active, setActive] = useState(false) 

    const handleAddItem = (productId) => {
    
            if (!userId) {
                ToastCenter.fire({
                    icon: "info",
                    title: `Vui lòng đăng nhập trước khi đặt hàng`
                })
            } else {         
                addToCart(userId, productId)
    
                setActive(true);
    
                setTimeout(() => {
                    setActive(false);
                }, 3000);
            };
        }
        

    // Kiểm tra nếu product chưa có dữ liệu, hiển thị loading hoặc thông báo lỗi
    if (!product) {
        return (
            <div id="preloader">
                <div class="loop cubes">
                    <div class="itemc cubes"></div>
                    <div class="itemc cubes"></div>
                    <div class="itemc cubes"></div>
                    <div class="itemc cubes"></div>
                    <div class="itemc cubes"></div>
                    <div class="itemc cubes"></div>
                </div>
            </div>
        );
    }



    return (
        <>
            <section id="product_details" className="section">
                <div className="container">
                    <div className="wrapper prod_details_wrapper">
                        {/*=== Product Details Left-content ===*/}
                        <div className="prod_details_left_col">
                            <div className="prod_details_tabs">
                                {product.product.images?.map((img, i) => (
                                    <div key={i} onClick={() => handlePreviewImg(i)}>
                                        <img src={`${api_url}/images/${img}`} alt="product-img" />
                                    </div>
                                ))}
                            </div>
                            <figure className="prod_details_img">
                                <img src={`${api_url}/images/${previewImg}`} alt="product-img" />
                            </figure>
                        </div>

                        {/*=== Product Details Right-content ===*/}
                        <div className="prod_details_right_col">
                            <h1 className="prod_details_title">{product.product.title}</h1>
                            <h4 className="prod_details_info">{product.product.info}</h4>

                            <div className="prod_details_ratings">
                                <span className="rating_star">
                                    {[...Array(product.countRate || 0)].map((_, i) => (
                                        <IoMdStar key={i} />
                                    ))}
                                </span>
                                <span>|</span>
                                <Link to="*">{product.ratings} Lượt đánh giá</Link>
                            </div>

                            <div className="separator"></div>

                            <div className="prod_details_price">
                                <div className="price_box">
                                    <h2 className="price">{displayMoney(product.product.finalPrice)} &nbsp;</h2>
                                    <span className="tax_txt">(Đã bao gồm thuế)</span>
                                </div>

                                <div className="badge">
                                    <span>
                                        <IoMdCheckmark /> Còn hàng
                                    </span>
                                </div>
                            </div>

                            <div className="separator"></div>

                            <div className="prod_details_offers">
                                <h4>Ưu đãi và giảm giá</h4>
                                <ul>
                                    <li>EMI không lãi suất trên thẻ tín dụng</li>
                                    <li>Thanh toán sau & Nhận hoàn tiền</li>
                                </ul>
                            </div>

                            <div className="separator"></div>

                            <div className="prod_details_buy_btn active">
                                <button type="button" className="btn"
                                onClick={() => handleAddItem(product.product._id)} style={{backgroundColor: active ? 'green' : ''}}>
                                    { active ? 'Đã thêm' : 'Thêm vào giỏ hàng'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <ProductSummary {...product.product} />

        </>
    );
};

export default DetailProduct;
