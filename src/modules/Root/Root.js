import './Root.css';
import 'mana-font/css/mana.min.css';
import 'keyrune/css/keyrune.min.css';
import React from 'react';
import { connect } from 'react-redux';
import { bool, func } from 'prop-types';
import Router from 'react-router-dom/HashRouter';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import Async from '../../components/Async';
import { mapStateToProps } from './connect/stateToProps';
import { dispatchToProps } from './connect/dispatchToProps';
import NavBar from '../../components/NavBar';
import Loader from '../../components/Loader';

const Timetable = (props) => <Async load={import('../Timetable/container')} componentProps={props} />;
const InteractiveMap = (props) => <Async load={import('../InteractiveMap/container')} componentProps={props} />;
const KonamiScreen = (props) => <Async load={import('../KonamiScreen/container')} componentProps={props} />;
const LocationInfo = (props) => <Async load={import('../LocationInfo/container')} componentProps={props} />;
const NewsList = (props) => <Async load={import('../NewsList/container')} componentProps={props} />;
const Voting = (props) => <Async load={import('../Voting/container')} componentProps={props} />;

class Root extends React.Component {

    componentWillMount() {
        this.props.appInitialized();
    }

    shouldComponentUpdate(nextProps) {
        return this.props.isInitial !== nextProps.isInitial;
    }

    render() {
        const { isInitial } = this.props;
        return (
            <Router>
                <section className="Root">
                    {!isInitial &&
                        <div className="Root__preloader">
                            <div className="Root__circular">
                                <Loader />
                            </div>
                        </div>
                    }
                    <NavBar />
                    <Switch>
                        <Route
                            exact
                            path="/"
                            component={KonamiScreen}
                        />
                        <Route
                            exact
                            path="/map"
                            component={InteractiveMap}
                        />
                        <Route
                            exact
                            path="/location/:id"
                            component={
                                ({match, history}) => <LocationInfo locationId={match.params.id} history={history} />
                            }
                        />
                        <Route
                            exact
                            path="/timetable"
                            component={Timetable}
                        />
                        <Route
                            exact
                            path="/news"
                            component={NewsList}
                        />
                        <Route
                            exact
                            path="/vote"
                            component={Voting}
                        />
                    </Switch>
                </section>
            </Router>
        );
    }
}

Root.propTypes = {
    isInitial: bool.isRequired,
    appInitialized: func.isRequired
};

export default connect(mapStateToProps, dispatchToProps)(Root);
