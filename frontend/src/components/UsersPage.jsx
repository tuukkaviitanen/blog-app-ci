import {
    Link,
    ListItemButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import {
    Link as RouterLink,
    Navigate,
    Route,
    Routes,
    useMatch,
} from 'react-router-dom';

function UserInfo({ user }) {
    return (
        <Paper sx={{ p: 4 }}>
            <Typography variant="h4">{user.name}</Typography>
            {user.blogs.map((blog) => (
                <ListItemButton
                    component={RouterLink}
                    to={`/blogs/${blog.id}`}
                    sx={{ m: 2, fontSize: '1.5rem' }}
                    key={blog.id}
                >
                    {blog.title}
                </ListItemButton>
            ))}
        </Paper>
    );
}

function UsersList({ users }) {
    const columnHeaderSX = { fontSize: '1.5rem', fontWeight: 600 };

    return (
        <>
            <Typography sx={{ mb: 5 }} variant="h3">
                Users
            </Typography>
            <TableContainer component={Paper} elevation={10}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={columnHeaderSX}>name</TableCell>
                            <TableCell sx={columnHeaderSX}>
                                blogs created
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>
                                    <Link component={RouterLink} to={user.id}>
                                        {user.name}
                                    </Link>
                                </TableCell>
                                <TableCell>{user.blogs.length}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

function UsersPage() {
    const users = useSelector((state) => state.user.users);

    const match = useMatch('/users/:id');
    const user = match ? users.find((u) => u.id === match.params.id) : null;

    return (
        <Routes>
            <Route path="/" element={<UsersList users={users} />} />
            <Route
                path="/:id"
                element={
                    user ? <UserInfo user={user} /> : <Navigate to="/users" />
                }
            />
        </Routes>
    );
}

export default UsersPage;
