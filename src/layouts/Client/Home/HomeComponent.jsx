import React, { useEffect } from 'react'
import MainBanner from './Banners/MainBanner'
import MainProduct from './Products/MainProduct'
import MainRelation from './Relation/MainRelation'
import MainSpecial from './Specials/MainSpecial'
import MainBrand from './MainBrand';
import MainBlog from './Blogs/MainBlog';
import MainShipping from './MainShipping';

export default function HomeComponent(props) {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <>
            <div className="main-page">
                <MainBanner />
                <MainProduct />
                <MainSpecial />
                <MainRelation />
                <MainBrand />
                <MainBlog />
                <MainShipping />
            </div>
        </>
    )
}