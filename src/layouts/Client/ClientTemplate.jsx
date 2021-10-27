import React, { useEffect } from 'react'
import ScrollToTop from '../../components/Client/Buttons/ScrollToTop';
import withLayout from '../../hoc/withLayouts';
import MainHeader from './Header/MainHeader';
import MainFooter from './Footer/MainFooter';
import { ToastContainer } from 'react-toastify';
import LoadingComponent from './LoadingComponent';
import { callApi } from '../../utils/callApi';
import publicIp from 'public-ip';
import MessageComponent from '../../components/Client/Chat/MessageComponent';

function ClientTemplate(props) {
    const getIp = async () => {
        return await publicIp.v4();
    }
    useEffect(() => {
        if (!localStorage.getItem('IP_GUEST')) {
            getIp().then(res => {
                const formData = new FormData();
                formData.append('ip_guest', res);
                localStorage.setItem('IP_GUEST', true);
                callApi('/api/visitor', 'post', formData);
            }).catch(e => {

            });
        }
    }, []);
    return (
        <>
            <ToastContainer />
            <MainHeader />
            {props.children}
            <MainFooter />
            <LoadingComponent />
            <ScrollToTop />
            <MessageComponent />
        </>
    )
}

export default withLayout(ClientTemplate);