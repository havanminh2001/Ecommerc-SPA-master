import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../Products/Modules/Actions';

export default function RangeComponent(props) {
    const value = useSelector(state => state.ProductClientReducer.filter.range);
    const dispatch = useDispatch();
    const handleRangePrice = (e) => {
        dispatch(actions.filterWithRange(e.target.value));
    }
    return (
        <>
            <div className="product__range">
                <h3>Price Range</h3>
                <div className="product__range--content">
                    <input type="range" onChange={handleRangePrice} className="form-range" defaultValue={10} step={10} min={100} max={2000} />
                    <p className="product__range--price">$ {value}</p>
                </div>
            </div>
        </>
    )
}
