import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        addBlog: (state, action) => [...state, action.payload],
        setBlogs: (state, action) => action.payload,
        updateBlog: (state, action) => {
            const updatedBlog = action.payload;
            return state.map((blog) =>
                blog.id === updatedBlog.id ? updatedBlog : blog
            );
        },
        deleteBlog: (state, action) => {
            const blogId = action.payload;
            return state.filter((blog) => blog.id !== blogId);
        },
    },
});

export const { addBlog, setBlogs, updateBlog, deleteBlog } = blogSlice.actions;

export const initializeBlogs = () => async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
};

const blogReducer = blogSlice.reducer;
export default blogReducer;
