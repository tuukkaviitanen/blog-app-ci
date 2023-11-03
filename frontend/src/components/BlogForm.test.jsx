import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from './BlogForm';

describe('<BlogForm />', () => {
    const createBlogHandler = jest.fn();

    beforeEach(() => {
        render(<BlogForm createBlog={createBlogHandler} />);
    });

    test('should call event handler and pass given blog as parameter', async () => {
        const titleInput = screen.getByPlaceholderText(/title/i);
        const authorInput = screen.getByPlaceholderText(/author/i);
        const urlInput = screen.getByPlaceholderText(/url/i);
        const submitButton = screen.getByText(/create/i);

        await userEvent.type(titleInput, 'Test blog');
        await userEvent.type(authorInput, 'Test author');
        await userEvent.type(urlInput, 'https://test_url.com');

        await userEvent.click(submitButton);

        expect(createBlogHandler.mock.calls).toHaveLength(1);
        expect(createBlogHandler.mock.calls[0][0]).toEqual({
            title: 'Test blog',
            author: 'Test author',
            url: 'https://test_url.com',
        });
    });
});
