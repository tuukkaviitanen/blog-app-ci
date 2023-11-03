/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import userService from '../services/users';

const initialState = {
    currentUser: null,
    users: [],
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        },
        clearCurrentUser: (state) => {
            state.currentUser = null;
        },
        setUsers: (state, action) => {
            state.users = action.payload;
        },
    },
});

export const { setCurrentUser, clearCurrentUser, setUsers } = userSlice.actions;

export const initializeUsers = () => async (dispatch) => {
    const users = await userService.getAll();
    dispatch(setUsers(users));
};

const userReducer = userSlice.reducer;

export default userReducer;
