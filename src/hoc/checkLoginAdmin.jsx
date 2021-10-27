import React, { useSelector } from 'react'
import { Redirect } from 'react-router-dom';
import HeaderComponent from '../components/Admin/HeaderComponent';
import SidebarComponent from '../components/Admin/SidebarComponent';
import { ACCESS_TOKEN } from '../settings/configUrl';
import { useHistory } from 'react-router-dom';
import { handleCompareTime, handleRefreshToken } from '../utils/expired';
import { Route } from 'react-router-dom';

const checkLoginAdmin = (WrapperComponent) => (props) => {
    const history = useHistory();
    if (localStorage.getItem(ACCESS_TOKEN) !== null) {
        if (handleCompareTime()) handleRefreshToken(history, props, true);
        return (
            <div className="wrapper">
                <SidebarComponent {...props} />
                <div className="content">
                    <div className="main__content">
                        <HeaderComponent {...props} />
                        <div className="bread-crumb">
                        </div>
                        <WrapperComponent {...props}></WrapperComponent>
                    </div>
                </div>
            </div>
        )
    }
    return <Redirect to="/" />
}

export default checkLoginAdmin;