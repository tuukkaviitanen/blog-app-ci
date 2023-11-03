import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    message: null,
    color: 'red',
};

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        showNotification: (state, action) => ({
            message: action.payload.message,
            severity: action.payload.severity,
        }),
        clearNotification: () => ({
            message: null,
        }),
    },
});

export const { showNotification, clearNotification } =
    notificationSlice.actions;

export const setNotification =
    (message, severity = 'error', seconds = 5) =>
    (dispatch) => {
        dispatch(showNotification({ message, severity }));
        setTimeout(() => dispatch(clearNotification()), seconds * 1000);
    };

const notificationReducer = notificationSlice.reducer;

export default notificationReducer;
