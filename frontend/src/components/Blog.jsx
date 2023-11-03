import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { Paper, ListItemButton } from '@mui/material';

function Blog({ blog }) {
    return (
        <Paper elevation={5} sx={{ m: 2 }}>
            <ListItemButton
                variant="button"
                component={RouterLink}
                to={blog.id}
                sx={{ fontSize: '1.5rem', py: 2 }}
            >
                {blog.title} {blog.author && <>by {blog.author}</>}{' '}
            </ListItemButton>
        </Paper>
    );
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
};

export default Blog;
