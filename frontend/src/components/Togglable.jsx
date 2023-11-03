import React, { useState, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { Box, Button } from '@mui/material';

// Named function is used here to counter "Component definition is missing display name" error from eslint
const Togglable = forwardRef((params, refs) => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    useImperativeHandle(refs, () => ({
        toggleVisibility,
    }));

    return (
        <>
            {isVisible && (
                <Box>
                    {params.children}
                    <Button
                        variant="outlined"
                        type="button"
                        onClick={toggleVisibility}
                    >
                        Cancel
                    </Button>
                </Box>
            )}

            {!isVisible && (
                <Box>
                    <Button
                        variant="contained"
                        type="button"
                        onClick={toggleVisibility}
                    >
                        {params.buttonText}
                    </Button>
                </Box>
            )}
        </>
    );
});

Togglable.propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    buttonText: PropTypes.string.isRequired,
};

Togglable.displayName = 'Togglable';

export default Togglable;
