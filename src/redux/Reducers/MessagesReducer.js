import * as constants from '../Contants/MessagesConstants';

const initialState = {
    messagesOrder: [],
    messenger: [],
    isModal: false,
    currentMessenger: []
}

const MessagesReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case constants.createMessagesOrder: {
            const temp = [...state.messagesOrder];
            temp.push(payload);
            return { ...state, messagesOrder: temp }
        }
        case constants.createMessenger: {
            let index = -1;
            const temp = [...state.messenger];
            let currentMessenger = [...state.currentMessenger];
            const arr = [];
            temp.forEach((mess, idx) => {
                const tmp = mess.filter(item => parseInt(item.idUser) === parseInt(payload.idUser));
                if (Array.isArray(tmp) && tmp.length > 0) {
                    index = idx;
                    return;
                }
            });
            if (index !== -1) {
                temp[index].push(payload);
                currentMessenger = [...temp[index]];
            } else {
                arr.push(payload);
                temp.push(arr);
            }
            return { ...state, messenger: temp, currentMessenger };
        }
        case constants.createMessengerAdmin: {
            break;
        }
        case constants.openMessenger: {
            return { ...state, isModal: payload };
        }
        case constants.fetchMessenger: {
            const temp = [...state.messenger][payload];
            return { ...state, isModal: true, currentMessenger: temp };
        }
        case constants.deleteMessenger: {
            let index = -1;
            const temp = [...state.messenger];
            temp.forEach((mess, idx) => {
                const tmp = mess.filter(item => item.user_id === payload);
                if (Array.isArray(tmp) && tmp.length > 0) {
                    index = idx;
                    return;
                } else {
                    index = -1;
                    return;
                }
            });
            temp.splice(index, 1);
            return { ...state, messenger: temp, currentMessenger: [], isModal: false };
        }
        default:
            return state
    }
}

export default MessagesReducer;