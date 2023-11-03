import PropTypes from 'prop-types';
import React from 'react';
import { Box, Button, FormControl, Input, InputLabel } from '@mui/material';
import { useField } from '../hooks';

function BlogForm({ createBlog }) {
    const title = useField('text');
    const author = useField('text');
    const url = useField('text');

    const handleNewBlog = async (event) => {
        event.preventDefault();

        const newBlog = {
            title: title.value,
            author: author.value,
            url: url.value,
        };

        createBlog(newBlog);

        title.reset();
        author.reset();
        url.reset();
    };

    const formControlSX = {
        m: 1,
    };

    return (
        <form onSubmit={handleNewBlog}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    flexDirection: { xs: 'column', md: 'row' },
                    m: 1,
                    p: 1,
                }}
            >
                <FormControl sx={formControlSX}>
                    <InputLabel>Title:</InputLabel>
                    <Input
                        {...title.form}
                        id="blog-title-input"
                        placeholder="title"
                    />
                </FormControl>

                <FormControl sx={formControlSX}>
                    <InputLabel>Author:</InputLabel>

                    <Input
                        {...author.form}
                        id="blog-author-input"
                        placeholder="author"
                    />
                </FormControl>

                <FormControl sx={formControlSX}>
                    <InputLabel>URL:</InputLabel>
                    <Input
                        {...url.form}
                        id="blog-url-input"
                        placeholder="url"
                    />
                </FormControl>

                <Button
                    sx={{ py: 1 }}
                    variant="contained"
                    id="blog-submit-button"
                    type="submit"
                >
                    Create
                </Button>
            </Box>
        </form>
    );
}

BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired,
};

export default BlogForm;
