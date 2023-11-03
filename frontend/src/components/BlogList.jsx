import React from 'react';
import { useSelector } from 'react-redux';

import { Box } from '@mui/material';
import Blog from './Blog';

function BlogList() {
    const blogs = useSelector((state) => state.blogs);

    return (
        <Box id="blog-list">
            {[...blogs]
                .sort((a, b) => b.likes - a.likes)
                .map((blog) => (
                    <Blog key={blog.id} blog={blog} />
                ))}
        </Box>
    );
}

export default BlogList;
