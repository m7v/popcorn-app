import './KonamiScreen.css';
import React from 'react';
import { shape, string, func } from 'prop-types';
import { connect } from 'react-redux';
import dispatchToProps from './connect/dispatchToProps';
import stateToProps from './connect/stateToProps';
import classNames from 'classnames';
import Dialog, { DialogActions, DialogContent } from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import EasterEgg from 'react-easter-egg';
import Konami from 'react-konami';
import logo from './assets/logo_header.png';
import withRouter from 'react-router-dom/withRouter';

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

class KonamiScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            showCode: false,
            language: 'en',
            ticketCode: props.ticketCode,
        };
    }

    componentWillMount() {
        this.props.getTicketCode();
    }

    toogleLang = (language) => {
        this.setState({
            language
        });
    };

    handleClick = (path) => {
        if (path === '/enter_code') {
            this.handleEnterCodeOpen();
        } else {
            this.props.history.push(path);
        }
    };

    handleEnterTicketCode = (value) => {
        this.setState({
            ticketCode: value.target.value.toUpperCase(),
        });
    };

    handleEnterCodeOpen = () => {
        this.setState({ showCode: true });
    };

    handleEnterCodeSave = () => {
        this.props.saveTicketCode(this.state.ticketCode);
        this.setState({
            ticketCode: this.state.ticketCode,
            showCode: false
        });
    };

    handleEnterCodeClose = () => {
        this.setState({ showCode: false });
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        return (
            <div className="KonamiScreen__root">
                <Konami easterEgg={this.handleOpen} />
                <EasterEgg callback={this.handleOpen}>
                    <Dialog
                        fullScreen
                        open={this.state.open}
                        onRequestClose={this.handleClose}
                    >
                        <DialogActions className="KonamiScreen__actions">
                            <Button className="KonamiScreen__closeButton" color="primary" onClick={this.handleClose}>
                                <span className="KonamiScreen__button">Close</span>
                            </Button>
                        </DialogActions>
                        <DialogContent className="KonamiScreen__drawer">
                            <div className="KonamiScreen__text">
                                Hello! <br />
                                My name is Andrew.<br />
                                I've created this application for you.<br />
                                I'm really happy that you found my easter egg.<br />
                                <img src="https://i.imgur.com/pnztT1T.gif" width={200} alt="" /><br />
                                powered by <a
                                    className="KonamiScreen__link"
                                    href="http://m7v.github.com"
                                    target="_blank"
                                    rel='noopener noreferrer'
                                >
                                    M7V
                                </a>
                            </div>
                        </DialogContent>
                    </Dialog>
                </EasterEgg>
                <Dialog
                    fullScreen
                    open={this.state.showCode}
                    onRequestClose={this.handleEnterCodeClose}
                >
                    <DialogActions className="KonamiScreen__actions">
                        <Button className="KonamiScreen__closeButton" color="primary" onClick={this.handleEnterCodeSave}>
                            <span className="KonamiScreen__button">
                                {screenText[this.state.language].saveButton}
                            </span>
                        </Button>
                        <Button className="KonamiScreen__closeButton" color="primary" onClick={this.handleEnterCodeClose}>
                            <span className="KonamiScreen__button">
                                {screenText[this.state.language].closeButton}
                            </span>
                        </Button>
                    </DialogActions>
                    <DialogContent className="KonamiScreen__drawer">
                        <div
                            className="KonamiScreen__text"
                            dangerouslySetInnerHTML={{ __html: screenText[this.state.language].enterCode }}
                        />
                        <input
                            type="text"
                            pattern='/[A-Za-z0-9]/'
                            defaultValue={this.props.ticketCode}
                            className="KonamiScreen__ticketCode"
                            onChange={this.handleEnterTicketCode}
                        />
                    </DialogContent>
                </Dialog>
                <div className="KonamiScreen__switcher">
                    <span
                        className={classNames({
                            'KonamiScreen__lang': true,
                            '_active': this.state.language === 'en',
                        })}
                        onClick={() => this.toogleLang('en')}
                    >
                        EN
                    </span>
                    /
                    <span
                        className={classNames({
                            'KonamiScreen__lang': true,
                            '_active': this.state.language === 'ru',
                        })}
                        onClick={() => this.toogleLang('ru')}
                    >
                        RU
                    </span>
                </div>
                <div className="KonamiScreen__logoWrapper">
                    <img src={logo} alt="logo" className="KonamiScreen__logo" />
                </div>
                <div className="KonamiScreen__welcomeText">
                    <div className="KonamiScreen__copyRight">
                        @ POPCORN TEAM 2018
                    </div>
                    <div className="KonamiScreen__esterHint">コナミコマンド</div>
                    <ul className="KonamiScreen__selectMenu">
                        {menuItems[this.state.language].map((item, idx) => (
                            <ol
                                key={item.path}
                                className="KonamiScreen__selectItem"
                                tabIndex={idx+1}
                                onClick={() => this.handleClick(item.path)}
                            >
                                {item.name}
                            </ol>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}

KonamiScreen.propTypes = {
    history: shape({}).isRequired,
    saveTicketCode: func.isRequired,
    getTicketCode: func.isRequired,
    ticketCode: string,
};

KonamiScreen.defaultProps = {
    ticketCode: '',
};

export default withRouter(connect(stateToProps, dispatchToProps)(KonamiScreen));
