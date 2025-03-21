import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';
import ProductCard from './ProductCard';
import { ProductContext } from '../../contexts/product/productContext';


const TopProducts = () => {

    const {products} = useContext(ProductContext)

    
    if(products.length === 0){
        return (
            <div>...Loading</div>
        )
    }



    return (
        <>
            <div className="wrapper products_wrapper">
                {
                    products?.filter(item => item.rateCount === 5).map(item => (
                        <ProductCard
                            key={item._id}
                            {...item}
                        />
                    ))
                }
                <div className="card products_card browse_card">
                    <Link to="/all-products">
                        Tất cả <br /> sản phẩm <BsArrowRight />
                    </Link>
                </div>
            </div>
        </>
    );
};

export default TopProducts;