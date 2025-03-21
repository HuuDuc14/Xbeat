import axios from "axios"
import { createContext, useEffect, useState } from "react"


export const AddressContext = createContext({})

export const AddressProvider = ({ children }) => {
    const api_url = 'http://localhost:5000'


    const getProvince = async () => {
        try {
            const response = await axios.get(`${api_url}/address/province`)
            return response.data
        } catch (error) {
            console.error("Lỗi khi lấy tỉnh", error);
            return []
        }
    }

    const getDistrict = async (provinceCode) => {
        try {
            const response = await axios.get(`${api_url}/address/district/${provinceCode}`)
            return response.data
        } catch (error) {
            console.error("Lỗi khi lấy huyện", error);
            return []
        }
    }

    const getWard = async (districtCode) => {
        try {
            const response = await axios.get(`${api_url}/address/ward/${districtCode}`)
            return response.data
        } catch (error) {
            console.error("Lỗi khi lấy xã", error);
            return []
        }
    }


    return <AddressContext.Provider value={{ getProvince, getDistrict, getWard }}>
        {children}
    </AddressContext.Provider>
}