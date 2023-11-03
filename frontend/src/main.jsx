import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';

import store from './store';
import App from './App';

const theme = createTheme({
    palette: {
        primary: {
            main: '#2C1320',
        },
        secondary: {
            main: '#5F4B66',
        },
    },
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <Router>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </Router>
    </Provider>
);
