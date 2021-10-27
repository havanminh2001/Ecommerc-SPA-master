import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../Products/Modules/Actions';
import { calculator } from '../../../services/product';

export default function FilterComponent(props) {
    const data = useSelector(state => state.ProductClientReducer.product.data);
    const dataTemp = useSelector(state => state.ProductClientReducer.temp.data);
    const isCheck = useSelector(state => state.ProductClientReducer.filter.checkValue.isCheck);
    const type = useSelector(state => state.ProductClientReducer.filter.checkValue.value);
    const dispatch = useDispatch();
    const handleCheckbox = (e) => {
        dispatch(actions.filterWithCheckbox(e.target.value));
    }
    return (
        <>
            <div className="product__filter--price">
                <h3>Filter by Price</h3>
                <div className="filter__list">
                    <div className="input-group">
                        <input className="form-check"
                            checked={isCheck && type === 'type-1'}
                            type="checkbox"
                            onChange={handleCheckbox} value="type-1" />
                        <label htmlFor="">$50 - 100 ({calculator('0', dataTemp)})</label>
                    </div>
                    <div className="input-group">
                        <input className="form-check"
                            checked={isCheck && type === 'type-2'}
                            type="checkbox"
                            onChange={handleCheckbox} value="type-2" />
                        <label htmlFor="">$100 - 500 ({calculator('1', dataTemp)})</label>
                    </div>
                    <div className="input-group">
                        <input className="form-check"
                            checked={isCheck && type === 'type-3'}
                            type="checkbox"
                            onChange={handleCheckbox} value="type-3" />
                        <label htmlFor="">$500 - 1000 ({calculator('2', dataTemp)})</label>
                    </div>
                    <div className="input-group">
                        <input className="form-check"
                            checked={isCheck && type === 'type-4'}
                            type="checkbox"
                            onChange={handleCheckbox} value="type-4" />
                        <label htmlFor="">$1000 - 2000 ({calculator('3', dataTemp)})</label>
                    </div>
                </div>
            </div>
        </>
    )
}
