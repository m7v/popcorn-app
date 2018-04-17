import './Timetable.css';
import 'keyrune/css/keyrune.min.css';
import React from 'react';
import { connect } from 'react-redux';
import { bool, arrayOf, shape, func } from 'prop-types';
import map from 'lodash/map';
import Link from 'react-router-dom/Link';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
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

    openBlock = (title) => {
        this.setState({
            blocks: {
                ...this.state.blocks,
                [title]: !this.state.blocks[title]
            }
        });
    };

    renderSchedule = () => map(this.props.timetable, (timetable, index) => (
        <div key={index} className="Timetable__result">
            <Link className="Timetable__set" to={`/location/${timetable.locationID}`}>
                <Card>
                    <CardMedia
                        className="Timetable__blockImage"
                        image={timetable.imageUrl}
                    />
                    <CardContent>
                        <Typography paragraph type="headline" component="h2">
                            {timetable.title}
                        </Typography>
                        <Typography paragraph>
                            <span>{timetable.period.startTime}</span>-<span>{timetable.period.endTime}</span>
                        </Typography>
                        {/*<Typography paragraph component="p" align="left">*/}
                            {/*<div className="Timetable__blockDescription">*/}
                                {/*{timetable.description}*/}
                            {/*</div>*/}
                        {/*</Typography>*/}
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
