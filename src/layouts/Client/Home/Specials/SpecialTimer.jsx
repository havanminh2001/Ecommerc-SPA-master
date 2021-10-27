import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function SpecialTimer(props) {
    const { data } = props;
    const history = useHistory();
    const dateNow = new Date();
    let interval = null;
    const [timer, setTimer] = useState({
        hours: 24 - dateNow.getHours(),
        minutes: 60 - dateNow.getMinutes(),
        seconds: dateNow.getSeconds()
    });
    const getDay = () => {
        const date = new Date(data?.discount_end);
        const result = (date.getTime() - dateNow.getTime()) / (24 * 60 * 60 * 1000);
        return parseInt(result);
    }
    const startTimer = () => {
        interval = setInterval(() => {
            const now = new Date();
            const hours = 24 - now.getHours();
            const minutes = 60 - now.getMinutes();
            const seconds = now.getSeconds();
            setTimer({ ...timer, hours, minutes, seconds });
        }, 1000);
    }
    useEffect(() => {
        if (history.length > 2) {
            startTimer();
            return () => {
                clearInterval(interval);
            }
        }
        window.addEventListener('load', startTimer);
        return () => {
            window.removeEventListener('load', clearInterval(interval));
            clearInterval(interval);
        }
    }, []);
    return (
        <>
            <div className="special__timer" id="special__timer">
                <div className="special__box">
                    <div className="special__number">
                        <span>
                            {data?.discount_end ? getDay() : ''}
                        </span>
                    </div>
                    <div className="special__char"><span>Days</span></div>
                </div>
                <div className="special__box">
                    <div className="special__number"><span>{timer.hours}</span></div>
                    <div className="special__char"><span>Hours</span></div>
                </div>
                <div className="special__box">
                    <div className="special__number"><span>{timer.minutes}</span></div>
                    <div className="special__char"><span>Minutes</span></div>
                </div>
                <div className="special__box">
                    <div className="special__number"><span>{timer.seconds}</span></div>
                    <div className="special__char"><span>Secondes</span></div>
                </div>
            </div>
        </>
    )
}
