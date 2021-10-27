import React, { useState, useEffect } from 'react';


export default function ScrollToTop() {
    const [visiable, setVisiable] = useState(false);
    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setVisiable(true);
        } else {
            setVisiable(false);
        }
    }
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }
    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        }
    }, []);
    return (
        <>
            <button className="scrollTop" style={{ opacity: visiable ? 1 : 0 }} onClick={scrollToTop}>
                <i className="lni lni-angle-double-up"></i>
            </button>
        </>
    )
}
