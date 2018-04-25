import './Timetable.css';
import 'keyrune/css/keyrune.min.css';
import React from 'react';
import { connect } from 'react-redux';
import { bool, arrayOf, shape, func } from 'prop-types';
import map from 'lodash/map';
import moment from 'moment';
import classNames from 'classnames';
import Link from 'react-router-dom/Link';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import Typography from 'material-ui/Typography';
import Loader from '../../components/Loader';
import MetaHelmet from '../../components/MetaHelmet';
import stateToProps from './connect/stateToProps';
import dispatchToProps from './connect/dispatchToProps';
import ErrorPage from '../../components/ErrorPage/ErrorPage';

class Timetable extends React.PureComponent {

    state = {
        blocks: {}
    };

    componentWillMount() {
        this.props.getTimetable();
    }

    getDate = (period) => {
        const startTime = moment(period.startTime * 1000).format('DD MMM h:mm');
        const endTime = moment(period.endTime * 1000).format('DD MMM h:mm');
        return `${startTime} - ${endTime}`;
    };

    renderSchedule = () => map(this.props.timetable, (timetable, index) => (
        <div key={index} className="Timetable__result">
            <Link className="Timetable__set" to={`/location/${timetable.locationID}`}>
                <Card>
                    {timetable.image &&
                        <CardMedia
                            className="Timetable__blockImage"
                            image={timetable.image}
                        />
                    }
                    <CardContent>
                        <Typography paragraph type="headline" component="h2">
                            {timetable.title}
                        </Typography>
                        <Typography paragraph>
                            {this.getDate(timetable.period)}
                        </Typography>
                        <Typography paragraph component="p" align="left">
                            <div className="Timetable__blockDescription">
                                {timetable.description}
                            </div>
                        </Typography>
                        <div className="Timetable__chips">
                            {timetable.tags && timetable.tags.map((tag, id) => (
                                <Chip
                                    key={id}
                                    label={tag.name.toUpperCase()}
                                    className={
                                        classNames({
                                            'Timetable__chip': true,
                                            '_cyber': tag.name === 'cyber',
                                            '_geek': tag.name === 'geek',
                                            '_show': tag.name === 'show',
                                        })
                                    }
                                />
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </Link>
        </div>
    ));

    render() {
        const { loading, error } = this.props;

        return (
            <section className="Timetable">
                <MetaHelmet type={'schedule'} />
                <div className="Timetable__main">
                    {loading &&
                        <div className="Timetable__preloader">
                            <div className="Timetable__circular">
                                <Loader />
                            </div>
                        </div>
                    }
                    {!loading && error &&
                        <ErrorPage />
                    }
                    {!loading && !error &&
                        <div className="Timetable__results">
                            { this.renderSchedule() }
                            { this.renderSchedule() }
                        </div>
                    }
                </div>
            </section>
        );
    }
}

Timetable.propTypes = {
    loading: bool,
    error: bool,
    timetable: arrayOf(shape({})),
    getTimetable: func.isRequired,
};

Timetable.defaultProps = {
    isMobile: false,
    loading: false,
    error: false,
    timetable: [],
};

export default connect(stateToProps, dispatchToProps)(Timetable);
