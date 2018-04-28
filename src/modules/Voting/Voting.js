import './Voting.css';
import React from 'react';
import { shape, arrayOf, string, func } from 'prop-types';
import { connect } from 'react-redux';
import dispatchToProps from './connect/dispatchToProps';
import stateToProps from './connect/stateToProps';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import IconButton from 'material-ui/IconButton';
import IconFavoriteBorder from 'material-ui-icons/FavoriteBorder';
import IconFavorite from 'material-ui-icons/Favorite';
import Select from 'material-ui/Select';
import thx from './assets/thx.png';
import map from 'lodash/map';

class Voting extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            voteId: '',
            ticketCode: '',
            isVoted: false,
        };
    }

    componentWillMount() {
        this.props.getTicketCode();
        this.props.getStands();
    }

    componentWillUpdate(nextProps) {
        if (this.props.ticketCode !== nextProps.ticketCode) {
            this.setState({
                ticketCode: nextProps.ticketCode
            });
        }
    }

    handleChange = event => {
        if (event.target.value) {
            this.setState({ voteId: event.target.value });
        }
    };

    handleChangeTicketCode = event => {
        this.setState({ ticketCode: event.target.value });
    };

    handleToggle = () => {
        this.props.appSetVote(this.state.voteId, this.state.ticketCode);
        this.setState({ isVoted: !this.state.isVoted });
    };

    renderSelectList = () => map(this.props.stands, (stand) => (
        <MenuItem key={stand.locationID} value={stand.locationID}>{stand.title}</MenuItem>
    ));

    render() {
        return (
            <div className="Voting__root">
                {!this.state.isVoted &&
                    <div className="Voting__container">
                        <h5 className="Voting__welcomeText">
                            Проголосуй за стенд, который понравился тебе больше всего!
                        </h5>
                        <FormControl className='Voting__form'>
                            <InputLabel htmlFor="name-input">Номер билета</InputLabel>
                            <Input
                                id="name-input"
                                value={this.state.ticketCode || this.props.ticketCode}
                                onChange={this.handleChangeTicketCode}
                            />
                        </FormControl>
                        {(this.state.ticketCode || this.props.ticketCode) &&
                            <FormControl className='Voting__form'>
                                <InputLabel htmlFor="standVote">Выбери стенд</InputLabel>
                                <Select
                                    value={this.state.voteId}
                                    onChange={this.handleChange}
                                    inputProps={{
                                        name: 'standVote',
                                        id: 'standVote',
                                        className: 'Voting__voting',
                                    }}
                                >
                                    <MenuItem value="">
                                        <em>Выбрать стенд</em>
                                    </MenuItem>
                                    { this.renderSelectList() }
                                </Select>
                            </FormControl>
                        }
                        {this.state.voteId &&
                            <IconButton className="Voting__button" onClick={this.handleToggle}>
                                <div>ЖМИ!</div>
                                <div className="Voting__buttonIcon">
                                    {!this.state.isVoted &&
                                        <IconFavoriteBorder />
                                    }
                                    {this.state.isVoted &&
                                        <IconFavorite />
                                    }
                                </div>
                            </IconButton>
                        }
                    </div>
                }
                {this.state.isVoted &&
                    <div>
                        <img className="Voting__thxImg" src={thx} alt="" />
                        <div className="Voting__thankYou">Cпасибо!</div>
                    </div>
                }
            </div>
        );
    }
}


Voting.propTypes = {
    stands: arrayOf(shape({})),
    appSetVote: func.isRequired,
    getStands: func.isRequired,
    getTicketCode: func.isRequired,
    ticketCode: string.isRequired,
};

Voting.defaultProps = {
    stands: [],
};

export default connect(stateToProps, dispatchToProps)(Voting);
