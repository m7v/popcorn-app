import './Timetable.css';
import 'keyrune/css/keyrune.min.css';
import React from 'react';
import { connect } from 'react-redux';
import { bool, arrayOf, shape, func } from 'prop-types';
import map from 'lodash/map';
import moment from 'moment';
import classNames from 'classnames';
import Link from 'react-router-dom/Link';
import Card, { CardContent } from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import Typography from 'material-ui/Typography';
import Loader from '../../components/Loader';
import MetaHelmet from '../../components/MetaHelmet';
import stateToProps from './connect/stateToProps';
import dispatchToProps from './connect/dispatchToProps';
import ErrorPage from '../../components/ErrorPage';
import EventFilter from '../../components/EventFilter';
import SimpleImg from '../../components/SimpleImg';

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
                        <div className="Timetable__blockImage">
                            <SimpleImg imageUrl={timetable.image} />
                        </div>
                    }
                    <CardContent>
                        <Typography paragraph type="headline" component="h2">
                            {timetable.title}
                        </Typography>
                        <Typography paragraph>
                            { timetable.period && this.getDate(timetable.period) }
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
                                    label={tag.toUpperCase()}
                                    className={
                                        classNames({
                                            'Timetable__chip': true,
                                            '_cyber': tag === 'cyber',
                                            '_geek': tag === 'geek',
                                            '_show': tag === 'show',
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
                <EventFilter
                    className={'Timetable__filter'}
                    tags={this.props.tags}
                    currentSet={{
                        name: 'Расписание',
                        code: 'timetable'
                    }}
                    appSetTagsFilter={this.props.appSetEventTagsFilter}
                    resultCount={this.props.timetable.length}
                />
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
    tags: shape({}).isRequired,
    appSetEventTagsFilter: func.isRequired,
    getTimetable: func.isRequired,
};

Timetable.defaultProps = {
    isMobile: false,
    loading: false,
    error: false,
    timetable: [],
};

export default connect(stateToProps, dispatchToProps)(Timetable);
