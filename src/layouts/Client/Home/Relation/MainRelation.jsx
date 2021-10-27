import React from 'react'
import RelationNewProduct from './RelationNewProduct'
import RelationRate from './RelationRate'
import RelationSeller from './RelationSeller'

export default function MainRelation() {
    return (
        <section className="relation mt-5">
            <div className="container">
                <div className="row">
                    <RelationSeller />
                    <RelationNewProduct />
                    <RelationRate />
                </div>
            </div>
        </section>
    )
}
