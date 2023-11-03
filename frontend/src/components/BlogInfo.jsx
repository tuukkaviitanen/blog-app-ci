import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Box,
    Button,
    FormControl,
    Input,
    InputLabel,
    Link,
    Paper,
    Typography,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { deleteBlog, updateBlog } from '../reducers/blogReducer';
import blogService from '../services/blogs';
import { setNotification } from '../reducers/notificationReducer';
import { useField } from '../hooks';

function BlogInfo({ blog }) {
    const dispatch = useDispatch();

    const commentField = useField('text');

    const currentUser = useSelector((state) => state.user.currentUser);

    const handleLike = async () => {
        try {
            const updatedBlog = await blogService.update(blog.id, {
                likes: blog.likes + 1,
            });

            dispatch(updateBlog({ ...blog, likes: updatedBlog.likes })); // only the likes property is used from the updatedBlog as the user is only an id
        } catch (exception) {
            console.error(exception);
        }
    };

    const handleDelete = async () => {
        const isSure = window.confirm(
            `Remove blog ${blog.title} by ${blog.author}?`
        );

        if (!isSure) return;

        try {
            await blogService.deleteById(blog.id);

            dispatch(deleteBlog(blog.id));

            dispatch(
                setNotification(
                    `${blog.title} by ${blog.author} was deleted`,
                    'success'
                )
            );
        } catch (exception) {
            console.error(exception);
            dispatch(setNotification('Not authorized'));
        }
    };

    const handleNewComment = async (event) => {
        event.preventDefault();

        const newComment = event.target.content.value;

        const updatedBlog = await blogService.addComment(blog.id, newComment);

        updatedBlog.user = currentUser;

        dispatch(updateBlog(updatedBlog));

        commentField.reset();
    };

    const buttonSX = { mx: 2 };

    return (
        <Paper sx={{ p: 3, pb: 6, fontSize: '1.3rem' }} elevation={10}>
            <Typography variant="h4">
                {blog.title} <em>by</em> {blog.author}
            </Typography>
            <Link href={blog.url} target="_blank" rel="noreferrer">
                {blog.url}
            </Link>
            <Typography>Likes: {blog.likes}</Typography>

            <Typography>
                added by{' '}
                <Link component={RouterLink} to={`/users/${blog.user.id}`}>
                    {blog.user.name}
                </Link>
            </Typography>
            <Box sx={{ display: 'flex', my: 2 }}>
                <Button
                    sx={buttonSX}
                    variant="contained"
                    type="button"
                    onClick={handleLike}
                >
                    Like
                </Button>
                {currentUser.username === blog.user.username && (
                    <Button
                        sx={buttonSX}
                        variant="outlined"
                        type="button"
                        onClick={handleDelete}
                    >
                        Remove
                    </Button>
                )}
            </Box>

            <Typography variant="h4">comments</Typography>

            <form onSubmit={handleNewComment}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        m: 2,
                        flexDirection: { xs: 'column', sm: 'row' },
                    }}
                >
                    <FormControl sx={{ m: 1 }}>
                        <InputLabel>Write a comment</InputLabel>
                        <Input {...commentField.form} name="content" />
                    </FormControl>
                    <Button variant="contained" sx={buttonSX} type="submit">
                        add comment
                    </Button>
                </Box>
            </form>

            <Box sx={{ p: 2, pb: 0 }}>
                {blog.comments.map((comment) => (
                    <li key={comment.id}>{comment.content}</li>
                ))}
            </Box>
        </Paper>
    );
}

export default BlogInfo;
