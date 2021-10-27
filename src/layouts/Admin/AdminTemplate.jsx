import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import HeaderComponent from '../../components/Admin/HeaderComponent';
import SidebarComponent from '../../components/Admin/SidebarComponent';
import { Breadcrumb } from 'antd';
import withLayout from '../../hoc/withLayouts';
import MessagesAdmin from '../../components/Admin/Chat/MessagesAdmin';
import { renderBreadcrumb } from '../../utils/helper';

function AdminTemplate(props) {
    const location = useLocation();
    const length = location.pathname.split('/').length;
    const arr = location.pathname.split('/');
    const breadcrumb = renderBreadcrumb(length, arr);
    return (
        <>
            <div className="wrapper" >
                <SidebarComponent {...props} />
                <div className="content">
                    <div className="main__content">
                        <HeaderComponent {...props} />
                        <div className="bread-crumb">
                            <Breadcrumb>
                                <Breadcrumb.Item><Link to="/admin/dashboard">Dashboard</Link></Breadcrumb.Item>
                                <Breadcrumb.Item>
                                    {
                                        breadcrumb === 'dashboard' ?
                                            '' : breadcrumb
                                    }
                                </Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        {props.children}
                    </div>
                </div>
            </div>
            <MessagesAdmin />
        </>
    )
}

export default withLayout(AdminTemplate);