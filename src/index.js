import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import yellow from 'material-ui/colors/yellow';
import store from './core/store';
import Root from './modules/Root/container';

injectTapEventPlugin();

const muiTheme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: yellow,
    },
});

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider theme={muiTheme}>
            <Root />
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
);
