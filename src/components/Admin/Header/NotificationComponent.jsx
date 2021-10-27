import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, NavLink } from 'react-router-dom';
import { alertErrors } from '../../../settings/config';
import { ACCESS_TOKEN, INFO } from '../../../settings/configUrl';
import { callApi } from '../../../utils/callApi';
import * as actions from '../../../redux/Actions/MessagesActions';
import Pusher from 'pusher-js';
import moment from 'moment';

export default function NotificationComponent(props) {
    const messenger = useSelector(state => state.MessagesReducer.messenger);
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        // Pusher.logToConsole = true;
        const pusher = new Pusher('14c23ec2e49bbd759476', {
            cluster: 'ap1',
            forceTLS: true
        });
        const channel = pusher.subscribe('messenger-channel');
        channel.bind('messenger-event', function (res) {
            if (parseInt(res.messenger.isRole) !== 2) {
                if (res.messenger.isLogout) {
                    dispatch(actions.deleteMessengerAct(res.messenger.idUser));
                } else {
                    dispatch(actions.createMessengerAct(res.messenger));
                }
            }
        });
        return () => { channel.unbind('messenger-event'); }
    }, []);
    const openMessenger = (index) => {
        dispatch(actions.fetchMessengerAct(index));
    }
    const renderNotification = () => {
        return messenger?.map((item, index) => {
            return item?.map((mes, i) => {
                if (mes.isRole !== 2) {
                    return (
                        <li className="message-item d-flex" key={index + i}
                            onClick={() => openMessenger(index)}>
                            <figure>
                                <img src="../img/man.png" width={40} height={40} alt="*" />
                            </figure>
                            <div className="message-text">
                                <h5>{mes.content}.</h5>
                                <p>{mes.name} · {moment(mes.time).startOf('hour').fromNow()}</p>
                            </div>
                            <hr />
                        </li>
                    )
                }
            })
        })
    }
    return (
        <>
            <li className="nav-item dropdown">
                <NavLink to="/admin/dashboard" className="nav-link content__icon--right" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="fa fa-envelope" />
                    <span className="notification">{messenger.reduce((total, item) => {
                        return total += item.reduce((sum, mes) => {
                            if (mes.isRole !== 2) {
                                return ++sum;
                            }
                            return sum;
                        }, 0)
                    }, 0)}</span>
                </NavLink>
                <ul className="dropdown-menu menu-custom" aria-labelledby="navbarDropdown" style={{ maxHeight: "300px", overflowY: "scroll" }}>
                    <li className="message-title">
                        Message Center
                    </li>
                    {
                        messenger.length > 0 ? renderNotification() :
                            <div className="message__order--empty" style={{ padding: "15px 0", textAlign: "center" }}>
                                <span style={{ fontSize: "14px", color: "#081828" }}>Messages Empty</span>
                            </div>
                    }
                </ul>
            </li>
        </>
    )
}
