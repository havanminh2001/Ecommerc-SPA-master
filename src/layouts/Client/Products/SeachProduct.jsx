import React from 'react'
import { useDispatch } from 'react-redux';
import * as actions from './Modules/Actions';

export default function SeachProduct(props) {
    const dispatch = useDispatch();
    const filterProduct = (e) => {
        dispatch(actions.filterWithSelect(e.target.value));
    }
    return (
        <>
            <div className="product__topbar">
                <div className="row align-items-center">
                    <div className="col-md-7 product__sorting">
                        <label htmlFor="sorting" className="product__label">Sort by:</label>
                        <select className="form-select" onChange={filterProduct}>
                            <option value="">Popularity</option>
                            <option value="low-high">Low - High Price</option>
                            <option value="high-low">High - Low Price</option>
                            <option value="A-Z">A - Z Order</option>
                            <option value="Z-A">Z - A Order</option>
                        </select>
                        <h3 className="product__total">Showing: <span>1 - 12 items</span></h3>
                    </div>
                    <div className="col-md-5">
                        <nav>
                            <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                <button className="nav-link active" id="nav-grid-tab" data-bs-toggle="tab" data-bs-target="#nav-grid" type="button" role="tab" aria-controls="nav-grid" aria-selected="true" title="Show Grid">
                                    <i className="lni lni-grid-alt" />
                                </button>
                                <button className="nav-link" id="nav-list-tab" data-bs-toggle="tab" data-bs-target="#nav-list" type="button" role="tab" aria-controls="nav-list" aria-selected="false" title="Show List">
                                    <i className="lni lni-list" />
                                </button>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    )
}
