import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { alertErrors } from '../../../settings/config';
import { callApi, callApiAdmin } from '../../../utils/callApi';
import * as actions from '../../../redux/Actions/MessagesActions';
import Pusher from 'pusher-js';
import { ACCESS_TOKEN } from '../../../settings/configUrl';

export default function MessagesAdmin() {
    const isOpen = useSelector(state => state.MessagesReducer.isModal);
    const messenger = useSelector(state => state.MessagesReducer.currentMessenger);
    const auth = useSelector(state => state.authReducer.currentUser);
    const dispatch = useDispatch();
    const sendMessage = (e) => {
        e.preventDefault();
        if (e.target[0].value) {
            const user = messenger[0];
            const formData = new FormData();
            formData.append('user_id', user.idUser);
            formData.append('messages', e.target[0].value);
            formData.append('isRole', 2);
            formData.append('name', auth.name);
            dispatch(actions.createMessengerAct({
                content: e.target[0].value,
                isRole: 2,
                idUser: parseInt(user.idUser)
            }));
            e.target[0].value = "";
            callApi(`api/support?token=${localStorage.getItem(ACCESS_TOKEN)}`, 'post', formData).then().catch(e => {
                alertErrors('Sorry, please try again!');
            })
        } else {
            alertErrors('Please, Enter messages to send');
        }
    }
    const renderMessenger = () => {
        return messenger?.map((mess, index) => {
            return (
                <div className="chat__item" key={index}>
                    {
                        mess.isRole === 2 ?
                            <div className="chat__self">
                                <div className="chat__content">
                                    <p>{mess.content}</p>
                                </div>
                                <figure>
                                    <img src={process.env.PUBLIC_URL + '/img/man.png'} alt="*" height={30} width={30} />
                                </figure>
                            </div>
                            :
                            <div className="chat__friend">
                                <figure>
                                    <img src={process.env.PUBLIC_URL + '/img/user.png'} alt="*" height={30} width={30} />
                                </figure>
                                <div className="chat__content">
                                    <p>{mess.content}</p>
                                </div>
                            </div>
                    }
                </div>
            )
        })
    }
    return (
        <>
            <div className={isOpen ? "chat__main chat__active" : "chat__main"}>
                <div className="chat__action">
                    <i className="fa fa-angle-down"
                        onClick={() => dispatch(actions.openMessengerAct(false))} title="Hide messenger"></i>
                </div>
                <div className="chat__list">
                    {
                        messenger.length > 0 ? renderMessenger() :
                            <div className="chat__empty">
                                <figure>
                                    <img src={process.env.PUBLIC_URL + '/img/chat-null.png'} alt="*" title="Messenger" />
                                </figure>
                                <div className="chat__empty--title">
                                    <span>
                                        No conversations found
                                    </span>
                                </div>
                            </div>
                    }
                </div>
                <form onSubmit={sendMessage} className="chat__form">
                    <div className="input-group">
                        <input type="text" className="form-control" />
                        <button className="btn btn-primary"><i className="fa fa-paper-plane"></i></button>
                    </div>
                </form>
            </div>
        </>
    )
}
