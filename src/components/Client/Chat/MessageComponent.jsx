import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { alertErrors, alertSuccess } from '../../../settings/config';
import { ACCESS_TOKEN, INFO } from '../../../settings/configUrl';
import { callApi } from '../../../utils/callApi';
import * as actions from '../../../redux/Actions/MessagesActions';
import Pusher from 'pusher-js';

export default function MessageComponent() {
    const messenger = useSelector(state => state.MessagesReducer.messenger);
    const [visiable, setVisiable] = useState(false);
    const user = JSON.parse(localStorage.getItem(INFO));
    const token = localStorage.getItem(ACCESS_TOKEN);
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
            if (parseInt(res.messenger.isRole) !== 1) {
                dispatch(actions.createMessengerAct(res.messenger));
            }
        });
        return () => { channel.unbind('messenger-event'); }
    }, []);
    const handleOpenChatBox = (e) => {
        e.preventDefault();
        if (token && user?.id) {
            setVisiable(!visiable)
        } else {
            history.push('/login');
        }
    }
    const sendMessage = (e) => {
        e.preventDefault();
        if (e.target[0].value) {
            const formData = new FormData();
            formData.append('isRole', 1);
            formData.append('messages', e.target[0].value);
            formData.append('name', user.name);
            formData.append('user_id', user.id);
            dispatch(actions.createMessengerAct({
                content: e.target[0].value,
                isRole: 1,
                idUser: user.id
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
        let index = -1;
        messenger.forEach((mess, i) => {
            const tmp = mess.filter(item => item.idUser === user?.id);
            if (Array.isArray(tmp) && tmp.length > 0) {
                index = i;
                return;
            }
        });
        if (index !== -1) {
            return messenger[index]?.map((mess, index) => {
                return (
                    <div className="chat-item" key={index}>
                        {
                            mess.isRole === 1 ?
                                <div className="chat-self">
                                    <div className="chat-content">
                                        <p>{mess.content}</p>
                                    </div>
                                    <figure>
                                        <img src={process.env.PUBLIC_URL + '/img/man.png'} alt="*" height={30} width={30} />
                                    </figure>
                                </div>
                                :
                                <div className="chat-friend">
                                    <figure>
                                        <img src={process.env.PUBLIC_URL + '/img/user.png'} alt="*" height={30} width={30} />
                                    </figure>
                                    <div className="chat-content">
                                        <p>{mess.content}</p>
                                    </div>
                                </div>
                        }
                    </div>
                )
            })
        }
    }
    return (
        <>
            <div className={visiable ? "chat-box chat__box--none" : "chat-box"}>
                <a href="*" onClick={(e) => handleOpenChatBox(e)}>
                    <img src={process.env.PUBLIC_URL + '/img/chat.png'} alt="*" title="Messenger" />
                </a>
            </div>
            <div className={visiable ? "chat-main chat-active" : "chat-main"}>
                <div className="chat-action">
                    <i className="fa fa-angle-down"
                        onClick={() => setVisiable(!visiable)} title="Hide messenger"></i>
                </div>
                <div className="chat-list">
                    {
                        messenger.length > 0 ? renderMessenger() : <div className="chat-empty">
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
                <form onSubmit={sendMessage} className="chat-form">
                    <div className="input-group">
                        <input type="text" className="form-control" />
                        <button className="btn btn-primary"><i className="fa fa-paper-plane"></i></button>
                    </div>
                </form>
            </div>
        </>
    )
}
