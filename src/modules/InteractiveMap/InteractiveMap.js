import './InteractiveMap.css';
import React from 'react';
import { shape } from 'prop-types';
import withRouter from 'react-router-dom/withRouter';
import ImageMapper from 'react-image-mapper';

class InteractiveMap extends React.Component {
    componentWillMount() {
    }

    URL = 'https://c1.staticflickr.com/5/4052/4503898393_303cfbc9fd_b.jpg';
    MAP = {
        name: 'Map',
        areas: [
            {
                id: '1', path: 'location/1', title: '1', shape: 'poly', coords: [25, 33, 27, 300, 128, 240, 128, 94]
            },
            {
                id: '2', path: 'location/1', title: '2', shape: 'poly', coords: [219, 118, 220, 210, 283, 210, 284, 119]
            },
            {
                id: '3', path: 'location/1', title: '3', shape: 'poly', coords: [381, 241, 383, 94, 462, 53, 457, 282]
            },
            {
                id: '4', path: 'location/1', title: '4', shape: 'poly', coords: [245, 285, 290, 285, 274, 239, 249, 238]
            }
        ]
    }

    handleClick = (area) => {
        if (this.props.location.pathname !== area.path) {
            this.props.history.push(area.path);
        }
    }

    render() {
        return (
            <div className="InteractiveMap__root">
                <ImageMapper
                    src={this.URL}
                    map={this.MAP}
                    width={500}
                    onClick={this.handleClick}
                />
            </div>
        );
    }
}

InteractiveMap.propTypes = {
    location: shape({}).isRequired,
    history: shape({}).isRequired,
};

export default withRouter(InteractiveMap);
