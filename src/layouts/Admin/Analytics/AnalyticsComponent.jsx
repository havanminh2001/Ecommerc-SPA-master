import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pusher from 'pusher-js';
import moment from "moment";
import { callApi } from '../../../utils/callApi';
import { ACCESS_TOKEN } from "../../../settings/configUrl";
import { alertErrors, alertSuccess } from "../../../settings/config";

export default function AnalyticsComponent() {
    const [message, setMessages] = useState("");
    const user = useSelector(state => state.authReducer.currentUser);
    useEffect(() => {
        Pusher.logToConsole = true;
        const pusher = new Pusher('14c23ec2e49bbd759476', {
            cluster: 'ap1',
            forceTLS: true
        });
        const channel = pusher.subscribe('my-channel');
        channel.bind('my-event', function (res) {
            setMessages(res.message);
        });
    }, []);
    const sendMessage = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('user_id', user.id);
        formData.append('messages', e.target[0].value);
        callApi(`api/support?token=${localStorage.getItem(ACCESS_TOKEN)}`, 'post', formData)
            .then(res => {
                alertSuccess('Send messages success');
            }).catch(e => {
                alertErrors('Sorry, please try again!');
            })
    }
    return (
        <>
            <div className="row">
                <div className="col-4"></div>
                <div className="col-4">
                    <form onSubmit={sendMessage}>
                        <input type="text" className="form-control mb-3" />
                        <button type="submit" className="btn btn-success">Send</button>
                    </form>
                    <span>{message}</span>
                </div>
                <div className="col-4"></div>
            </div>
        </>
    )
}
