import * as constants from '../Contants/MessagesConstants';

export const createMessagesOrderAct = payload => ({
    type: constants.createMessagesOrder,
    payload
});

export const createMessengerAct = payload => ({
    type: constants.createMessenger,
    payload
});

export const openMessengerAct = payload => ({
    type: constants.openMessenger,
    payload
});

export const fetchMessengerAct = payload => ({
    type: constants.fetchMessenger,
    payload
});

export const deleteMessengerAct = payload => ({
    type: constants.deleteMessenger,
    payload
});