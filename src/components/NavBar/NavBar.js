import './NavBar.css';
import React from 'react';
import BottomNavigation, { BottomNavigationButton } from 'material-ui/BottomNavigation';
import { shape } from 'prop-types';
import withRouter from 'react-router-dom/withRouter';
import findIndex from 'lodash/findIndex';
import Paper from 'material-ui/Paper';
import IconSearch from 'material-ui-icons/Map';
import IconFavorite from 'material-ui-icons/Notifications';
import IconStars from 'material-ui-icons/Stars';
import IconHome from 'material-ui-icons/Home';
import IconBrowse from 'material-ui-icons/Inbox';

const browseIcon = <IconBrowse />;
const homeIcon = <IconHome />;
const starIcon = <IconStars />;
const favoritesIcon = <IconFavorite />;
const searchIcon = <IconSearch />;

const navbarConfig = [
    {
        path: '/map',
        icon: searchIcon,
        label: 'Map',
    },
    {
        path: '/news',
        icon: browseIcon,
        label: 'News',
    },
    {
        path: '/',
        root: true,
        icon: homeIcon,
        label: 'Home',
    },
    {
        path: '/timetable',
        icon: favoritesIcon,
        label: 'Timetable',
    },
    {
        path: '/1',
        icon: starIcon,
        label: 'Voting',
    }
];

class NavBar extends React.PureComponent {

    getRouteIndex(itemPath) {
        const path = itemPath || this.props.location.pathname;
        return findIndex(navbarConfig, (o) => !o.root && path.indexOf(o.path) >= 0);
    }

    renderNavigationLinks() {
        return navbarConfig.map((item) => (
            <BottomNavigationButton
                key={item.path}
                icon={item.icon}
                value={this.getRouteIndex(item.path)}
                className={'NavBar__button'}
                onClick={() => {
                    if (this.props.location.pathname !== item.path) {
                        this.props.history.push(item.path);
                    }
                }}
            />
        ));
    }

    render() {
        if (this.props.history.location.pathname === '/') {
            return null;
        }

        return (
            <Paper className="NavBar__root" elevation={4}>
                <BottomNavigation value={this.getRouteIndex()}>
                    { this.renderNavigationLinks() }
                </BottomNavigation>
            </Paper>
        );
    }
}

NavBar.propTypes = {
    location: shape({}).isRequired,
    history: shape({}).isRequired,
};

export default withRouter(NavBar);
