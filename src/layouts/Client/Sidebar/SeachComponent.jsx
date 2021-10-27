import React from 'react'

export default function SeachComponent() {
    return (
        <>
            <div className="product__seach">
                <h3>Search Product</h3>
                <form action="*">
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Seach Here..." />
                        <button className="btn btn-outline-secondary" type="submit">
                            <i className="lni lni-search-alt" />
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}
