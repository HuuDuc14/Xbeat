import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const ProductReviewContext = createContext({})

export const ProductReviewProvider = ({ children }) => {
    const api_url = 'http://localhost:5000'
    const [productReviews, setProductReviews] = useState([])

    const fetchProductReview = async (productId) => {
        try {
            const response = await axios.get(`${api_url}/review/productReview/${productId}`)
            setProductReviews(response.data.reviews)
            return response.data.reviews
        } catch (error) {
            console.error("Lỗi khi lấy đánh giá sản phẩm!", error);
        }
    }

    const review = async (userId, reviewData) => {
        try {
            const response = await axios.post(`${api_url}/review/create/${userId}`, reviewData)
            const newReview = response.data.review
            setProductReviews(prevReviews => [...prevReviews, newReview])
            return response.data

        } catch (error) {
            console.error('Error adding product:', error);
        }
    }

    return <ProductReviewContext.Provider value={{ review, fetchProductReview, productReviews }}>
        {children}
    </ProductReviewContext.Provider>
}