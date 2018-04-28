import './Voting.css';
import React from 'react';
import { shape, string, func } from 'prop-types';
import { connect } from 'react-redux';
import dispatchToProps from './connect/dispatchToProps';
import stateToProps from './connect/stateToProps';
import classNames from 'classnames';
import Dialog, { DialogActions, DialogContent } from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';
import EasterEgg from 'react-easter-egg';
import Konami from 'react-konami';
import logo from './assets/logo_header.png';
import withRouter from 'react-router-dom/withRouter';
import Typography from 'material-ui/Typography';
import map from 'lodash/map';

const menuItems = {
    en: [
        {
            name: 'Map',
            path: '/map',
        },
        {
            name: 'News',
            path: '/news',
        },
        {
            name: 'Schedule',
            path: '/timetable',
        },
        {
            name: 'Enter code',
            path: '/enter_code',
        },
    ],
    ru: [
        {
            name: 'Карта',
            path: '/map',
        },
        {
            name: 'Новости',
            path: '/news',
        },
        {
            name: 'Расписание',
            path: '/timetable',
        },
        {
            name: 'Введите код',
            path: '/enter_code',
        },
    ]
};

const screenText = {
    en: {
        enterCode: 'Welcome to Popcorn!<br />Please enter your ticker code<br />',
        saveButton: 'Save',
        closeButton: 'Close',
    },
    ru: {
        enterCode: 'Добро пожаловать на Popcorn!<br />Введи номер своего билета<br />',
        saveButton: 'Сохранить',
        closeButton: 'Закрыть',
    }
};

class Voting extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            showCode: false,
            language: 'en',
            ticketCode: props.ticketCode,
            votedID: props.votedID,
        };
    }

    componentWillMount() {
        this.props.getTicketCode();
        this.props.getStands();
        console.log(this.props);
    }

    toogleLang = (language) => {
        this.setState({
            language
        });
    };


    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleChange = () => {
            // todo
    };


    renderSelectList = () => map(this.props.stands, (stand, index) => (
        <MenuItem key={stand.locationID} value={stand.locationID}>{stand.title}</MenuItem>
    ));

    render() {
        return (
            
            <div className="Voting__root">
                <div className="Voting__logoWrapper">
                    <img src={logo} alt="logo" className="KonamiScreen__logo" />
                    <Typography paragraph type="headline" component="h2">
                            Проголосуй за стенд, который понравился тебе больше всего!
                        </Typography>
                </div>
                <InputLabel htmlFor="standVote">Выбери стенд</InputLabel>
                <Select
                    value={this.state.votedID}
                    onChange={this.handleChange}
                    inputProps={{
                    name: 'standVote',
                    id: 'standVote',
                    className: 'Voting__blahblah',
                    }}
                >
                    <MenuItem value="">
                    <em>Выбрать стенд</em>
                    </MenuItem>
                    { this.renderSelectList() }
                </Select>
                
                
            </div>
        );
    }
}


Voting.propTypes = {
    history: shape({}).isRequired,
    getTicketCode: func.isRequired,
    getStands: func.isRequired,
    ticketCode: string,
};

Voting.defaultProps = {
    ticketCode: '',
    votedID: 0,
    stands: [],
};

export default withRouter(connect(stateToProps, dispatchToProps)(Voting));
