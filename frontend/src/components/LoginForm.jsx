import React from 'react';
import PropTypes from 'prop-types';
import {
    Box,
    Button,
    FormControl,
    Input,
    InputLabel,
    Typography,
} from '@mui/material';
import { useField } from '../hooks';

function LoginForm({ logInUser }) {
    const password = useField('password');
    const username = useField('text');

    const handleLogin = (event) => {
        event.preventDefault();

        logInUser({ username: username.value, password: password.value });

        username.reset();
        password.reset();
    };

    const formSX = {
        p: 3,
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'center',
    };

    const formControlSX = {
        m: 1,
    };

    return (
        <Box>
            <Typography variant="h3" sx={{ textAlign: 'center', m: 5 }}>
                Log in to application
            </Typography>
            <form onSubmit={handleLogin}>
                <Box sx={formSX}>
                    <FormControl sx={formControlSX}>
                        <InputLabel htmlFor="username-input">
                            username
                        </InputLabel>
                        <Input {...username.form} id="username-input" />
                    </FormControl>
                    <FormControl sx={formControlSX}>
                        <InputLabel htmlFor="password-input">
                            password
                        </InputLabel>
                        <Input {...password.form} id="password-input" />
                    </FormControl>
                    <Button
                        variant="contained"
                        id="login-submit-button"
                        type="submit"
                        sx={formControlSX}
                    >
                        Login
                    </Button>
                </Box>
            </form>
        </Box>
    );
}

LoginForm.propTypes = {
    logInUser: PropTypes.func.isRequired,
};

export default LoginForm;
