import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Navigate, Route, Routes, useMatch } from 'react-router-dom';
import { Paper, Typography } from '@mui/material';
import blogService from '../services/blogs';

import BlogForm from './BlogForm';
import BlogList from './BlogList';
import Togglable from './Togglable';
import { setNotification } from '../reducers/notificationReducer';
import { addBlog } from '../reducers/blogReducer';
import BlogInfo from './BlogInfo';

function BlogPage() {
    const dispatch = useDispatch();
    const blogs = useSelector((state) => state.blogs);
    const currentUser = useSelector((state) => state.user.currentUser);
    const blogFormToggleRef = useRef();

    const handleNewBlog = async (newBlog) => {
        try {
            const createdBlog = await blogService.create(newBlog);

            createdBlog.user = currentUser;

            console.log(createdBlog);

            dispatch(addBlog(createdBlog));

            dispatch(
                setNotification(
                    `a new blog ${createdBlog.title} by ${createdBlog.author} was created`,
                    'success'
                )
            );

            blogFormToggleRef.current?.toggleVisibility();
        } catch (exception) {
            console.error(exception);
            dispatch(setNotification('Invalid blog!'));
        }
    };

    const match = useMatch('/blogs/:id');
    const blog = match ? blogs.find((b) => b.id === match.params.id) : null;

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <>
                        <Typography sx={{ mb: 5 }} variant="h3">
                            Blogs
                        </Typography>

                        <Paper
                            elevation={5}
                            sx={{
                                m: 1,
                                p: 2,
                            }}
                        >
                            <Typography sx={{ m: 1 }} variant="h4">
                                Create new blog
                            </Typography>
                            <Togglable
                                buttonText="Create blog"
                                ref={blogFormToggleRef}
                            >
                                <BlogForm createBlog={handleNewBlog} />
                            </Togglable>
                        </Paper>
                        <br />

                        <BlogList />
                    </>
                }
            />

            <Route
                path="/:id"
                element={
                    blog ? <BlogInfo blog={blog} /> : <Navigate to="/blogs" />
                }
            />
        </Routes>
    );
}

export default BlogPage;
