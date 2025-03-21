import axios from "axios"
import { createContext, useEffect, useState } from "react"


export const CartContext = createContext({})

export const CartProvider = ({ children }) => {
    const api_url = 'http://localhost:5000'
    const [cart, setCart] = useState([])

    const cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);

    const fetchCart = async (userId) => {
        try {
            const reponse = await axios.get(`${api_url}/cart/${userId}`)
            setCart(reponse.data.items)
            return reponse.data.items
        } catch (error) {
            console.error("There was an error fetching the cart!", error);
        }
    }
    
    

    const addToCart = async (userId, productId) => {
        try {
            await axios.post(`${api_url}/cart`, {
                userId,
                items: [{ productId, quantity: 1 }]
            })
            // const updateCart = fetchCart(userId)
            // setCart(updateCart)
            fetchCart(userId);
        } catch (error) {
            console.error("There was an error add to cart!", error);
        }
    }

    const decrementItem = async (userId, id) => {
        try {
            const response = await axios.post(`${api_url}/cart/decrement/${userId}/${id}`);
            setCart(response.data.items);
        } catch (error) {
            console.error("Error decrementing item:", error);
        }
        fetchCart(userId);
    };

    const clearCart = async (userId) => {
        try {
            await axios.post(`${api_url}/cart/deleteCart/${userId}`)
        } catch (error) {
            console.error("Lỗi khi xóa giỏ hàng", error);
        }
    }

    return <CartContext.Provider value={{ cart, cartQuantity, fetchCart, addToCart, decrementItem, clearCart }}>
        {children}
    </CartContext.Provider>
}