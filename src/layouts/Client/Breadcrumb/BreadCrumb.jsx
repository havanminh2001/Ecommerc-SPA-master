import React from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { capitalize } from '../../../utils/helper'

export default function BreadCrumb(props) {
    const history = useHistory();
    return (
        <>
            <section className="breadcrumb">
                <div className="container">
                    <div className="breadcrumb__content">
                        <ul className="breadcrumb__list">
                            <li className="breadcrumb__item">
                                <NavLink className="breadcrumb__navlink" to="/">
                                    <i className="lni lni-home" />
                                    Home
                                </NavLink>
                            </li>
                            <li className="breadcrumb__item">
                                {
                                    capitalize(history.location.pathname.split('/').join(''))
                                }
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </>
    )
}
