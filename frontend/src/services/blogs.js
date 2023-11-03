import axios from 'axios';

const baseUrl = '/api/blogs';

let authHeader;

const setToken = (token) => {
    authHeader = `Bearer ${token}`;
};

const getAll = async () => {
    const result = await axios.get(baseUrl);
    return result.data;
};

const create = async (newBlog) => {
    const config = {
        headers: {
            Authorization: authHeader,
        },
    };
    const result = await axios.post(baseUrl, newBlog, config);

    return result.data;
};

const update = async (blogId, updatedBlog) => {
    const result = await axios.put(`${baseUrl}/${blogId}`, updatedBlog);

    return result.data;
};

const deleteById = async (blogId) => {
    const config = {
        headers: {
            Authorization: authHeader,
        },
    };

    const result = await axios.delete(`${baseUrl}/${blogId}`, config);

    return result.data;
};

const addComment = async (blogId, comment) => {
    const result = await axios.post(`${baseUrl}/${blogId}/comments`, {
        content: comment,
    });

    return result.data;
};

const blogService = {
    getAll,
    create,
    update,
    deleteById,
    addComment,
    setToken,
};

export default blogService;
