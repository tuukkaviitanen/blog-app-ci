import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link as RouterLink, Navigate, Route, Routes } from 'react-router-dom';
import { Container, Typography, Button, Paper } from '@mui/material';
import blogService from './services/blogs';
import loginService from './services/login';

import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import { setNotification } from './reducers/notificationReducer';
import {
    clearCurrentUser,
    initializeUsers,
    setCurrentUser,
} from './reducers/userReducer';
import BlogPage from './components/BlogPage';
import UsersPage from './components/UsersPage';
import { initializeBlogs } from './reducers/blogReducer';

function App() {
    const dispatch = useDispatch();

    const currentUser = useSelector((state) => state.user.currentUser);

    const LOCALSTORAGE_USER = 'loggedBlogsUser';

    useEffect(() => {
        dispatch(
            setCurrentUser(
                JSON.parse(window.localStorage.getItem(LOCALSTORAGE_USER))
            )
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        dispatch(initializeUsers());
        dispatch(initializeBlogs());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (currentUser === null) {
            window.localStorage.removeItem(LOCALSTORAGE_USER);
        } else {
            window.localStorage.setItem(
                LOCALSTORAGE_USER,
                JSON.stringify(currentUser)
            );
            blogService.setToken(currentUser.token);
        }
    }, [currentUser]);

    const handleLogOut = () => dispatch(clearCurrentUser());

    const handleLogin = async (loggingUser) => {
        try {
            const loggedInUser = await loginService.login(loggingUser);
            dispatch(setCurrentUser(loggedInUser));
        } catch (exception) {
            console.log('error', exception);
            dispatch(setNotification('Wrong username or password', 'error'));
        }
    };

    const navBarSX = {
        p: 2,
        bgcolor: 'secondary.main',
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexWrap: 'wrap',
        color: 'white',
    };

    const navButtonSX = { fontSize: '2rem', color: 'white' };

    return (
        <Container>
            <Notification />

            {currentUser === null && <LoginForm logInUser={handleLogin} />}

            {currentUser !== null && (
                <>
                    <Paper elevation={10} sx={navBarSX}>
                        <Button
                            sx={navButtonSX}
                            component={RouterLink}
                            to="/blogs"
                        >
                            blogs
                        </Button>
                        <Button
                            sx={navButtonSX}
                            component={RouterLink}
                            to="/users"
                        >
                            users
                        </Button>
                        <Typography>Logged in as {currentUser.name}</Typography>
                        <Button
                            variant="contained"
                            type="button"
                            onClick={handleLogOut}
                        >
                            Log out
                        </Button>
                    </Paper>

                    <Container sx={{ p: 5 }}>
                        <Routes>
                            <Route path="/users/*" element={<UsersPage />} />
                            <Route path="/blogs/*" element={<BlogPage />} />
                            <Route
                                path="*"
                                element={<Navigate to="/blogs" />}
                            />
                        </Routes>
                    </Container>
                </>
            )}
        </Container>
    );
}

export default App;
