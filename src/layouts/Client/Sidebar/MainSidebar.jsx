import React from 'react'
import CategoryComponent from './CategoryComponent'
import SeachComponent from './SeachComponent'
import RangeComponent from './RangeComponent'
import FilterComponent from './FilterComponent'

export default function MainSidebar() {
    return (
        <>
            <div className="col-lg-3">
                <div className="product__sidebar">
                    <SeachComponent />
                    <CategoryComponent />
                    <RangeComponent />
                    <FilterComponent />
                </div>
            </div>
        </>
    )
}
