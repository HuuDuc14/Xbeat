import React, { useContext } from 'react';
import HeroSlider from '../components/sliders/HeroSlider';
import FeaturedSlider from '../components/sliders/FeaturedSlider';
import SectionsHead from '../components/common/SectionsHead';
import TopProducts from '../components/product/TopProducts';
import { ProductContext } from '../contexts/product/productContext';


const Home = () => {

    return (
        <main>
            <section id="hero">
                <HeroSlider />
            </section>

            <section id="featured" className="section">
                <div className="container">
                    <SectionsHead heading="Sản phẩm nổi bật" />
                    <FeaturedSlider/>
                </div>
            </section>

            <section id="products" className="section">
                <div className="container">
                    <SectionsHead heading="Sản phẩm hàng đầu" />
                    <TopProducts />
                </div>
            </section>
        </main>
    );
};

export default Home;;