import { Alert } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

function Notification() {
    const { message, severity } = useSelector((store) => store.notification);

    const sx = {
        border: '2px solid',
        padding: 2,
        margin: 2,
    };

    if (message)
        return (
            <Alert severity={severity} sx={sx}>
                {message}
            </Alert>
        );
}

export default Notification;
