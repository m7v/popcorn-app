import './LocationInfo.css';
import './LocationInfoMobile.css';
import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import List, { ListItem, ListItemText } from 'material-ui/List';
import { bool, string, func, shape } from 'prop-types';
import map from 'lodash/map';
import classNames from 'classnames';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import Typography from 'material-ui/Typography';
import { dispatchToProps } from './connect/dispatchToProps';
import { stateToProps } from './connect/stateToProps';
import Loader from '../../components/Loader/Loader';
import ButtonBack from '../../components/ButtonBack';
import MetaHelmet from '../../components/MetaHelmet';
import ErrorPage from '../../components/ErrorPage/ErrorPage';

class LocationInfo extends React.PureComponent {

    componentWillMount() {
        if (this.props.locationId) {
            this.props.getLocationById(this.props.locationId);
            this.props.getFavoritesLocationList();
        }
    }

    componentWillUpdate(nextProps) {
        if (this.props.locationId !== nextProps.locationId) {
            this.props.getLocationById(nextProps.locationId);
        }
    }

    getDate = (period) => {
        const startTime = moment(period.startTime * 1000).format('DD MMM h:mm');
        const endTime = moment(period.endTime * 1000).format('DD MMM h:mm');
        return `${startTime} - ${endTime}`;
    };

    render() {
        const { location, loading, error } = this.props;

        if (error) {
            return (
                <ErrorPage />
            );
        }

        const root = classNames({
            'LocationInfo__root': true,
            '_mobile': this.props.isMobile,
        });

        return (
            <div className={root}>
                {!loading &&
                    <ButtonBack className="LocationInfo__back" />
                }
                {loading &&
                    <div className="LocationInfo__preloader">
                        <div className="LocationInfo__circular">
                            <Loader />
                        </div>
                    </div>
                }
                {!loading &&
                    <div className="LocationInfo__container">
                        <MetaHelmet type={'location'} location={location} />
                        <Card>
                            {location.image &&
                                <CardMedia
                                    className="LocationInfo__blockImage"
                                    image={location.image}
                                    title="Contemplative Reptile"
                                />
                            }
                            <CardContent>
                                <Typography type="headline" component="h2">
                                    {location.title}
                                </Typography>
                                <Typography component="p" align="center">
                                    {location.description}
                                </Typography>
                                <div className="LocationInfo__chips">
                                    {['cyber', 'geek', 'show'].map((tag, id) => (
                                        <Chip
                                            key={id}
                                            label={tag.toUpperCase()}
                                            className={
                                                classNames({
                                                    'LocationInfo__chip': true,
                                                    '_cyber': tag === 'cyber',
                                                    '_geek': tag === 'geek',
                                                    '_show': tag === 'show',
                                                })
                                            }
                                        />
                                    ))}
                                </div>
                                <List>
                                    {map(location.events, (event) => {
                                        return (
                                            <ListItem key={event.id} >
                                                <ListItemText
                                                    primary={event.title}
                                                    secondary={this.getDate(event.period)}
                                                />
                                            </ListItem>
                                        );
                                    })}
                                </List>
                            </CardContent>
                        </Card>
                    </div>
                }
            </div>
        );
    }
}

LocationInfo.propTypes = {
    history: shape({}).isRequired,
    locationId: string.isRequired,
    location: shape({}).isRequired,
    locationAdd: func.isRequired,
    locationDelete: func.isRequired,
    getLocationById: func.isRequired,
    getFavoritesLocationList: func.isRequired,
    setQueryString: func.isRequired,
    isFavorite: bool,
    isMobile: bool,
    loading: bool,
    error: bool,
};

LocationInfo.defaultProps = {
    location: {},
    isFavorite: false,
    isMobile: false,
    loading: false
};

export default connect(stateToProps, dispatchToProps)(LocationInfo);