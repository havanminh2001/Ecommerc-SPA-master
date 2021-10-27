import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../../../redux/Actions/MessagesActions';
import * as count from '../../../layouts/Admin/Dashboard/modules/Actions';
import Pusher from 'pusher-js';
import moment from "moment";

export default function OrderNotification() {
    const messages = useSelector(state => state.MessagesReducer.messagesOrder);
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        // Pusher.logToConsole = true;
        const pusher = new Pusher('14c23ec2e49bbd759476', {
            cluster: 'ap1',
            forceTLS: true
        });
        const channel = pusher.subscribe('order-channel');
        channel.bind('order-event', function (res) {
            dispatch(actions.createMessagesOrderAct(res.order));
            dispatch(count.countAction());
        });
        return () => { channel.unbind('order-event'); }
    }, []);
    const renderMessages = () => {
        return messages?.map(mess => {
            return (
                <li className="message-item d-flex" key={mess.code} onClick={() => history.push('/admin/order?type=pusher')}>
                    <div className="message-text">
                        <h5>{mess.messages}</h5>
                        <p>Code: {mess.code} · {moment(mess.time).startOf('hour').fromNow()}</p>
                    </div>
                </li>
            )
        })
    }
    return (
        <>
            <li className="nav-item dropdown">
                <NavLink to="/admin/dashboard" className="nav-link content__icon--right" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="fa fa-bell" />
                    <span className="notification">{messages.length}</span>
                </NavLink>
                <ul className="dropdown-menu menu-custom" aria-labelledby="navbarDropdown">
                    <li className="message-title">
                        Notification Order
                    </li>
                    {messages.length > 0 ? renderMessages() :
                        <div className="message__order--empty" style={{ padding: "15px 0", textAlign: "center" }}>
                            <span style={{ fontSize: "14px", color: "#081828" }}>Notification Empty</span>
                        </div>
                    }
                </ul>
            </li>
        </>
    )
}
