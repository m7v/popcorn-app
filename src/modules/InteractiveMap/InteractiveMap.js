import './InteractiveMap.css';
import React from 'react';
import $ from 'jquery';
import './lib/map';
import { shape } from 'prop-types';
import withRouter from 'react-router-dom/withRouter';

class InteractiveMap extends React.Component {
    componentWillMount() {
        $(document).ready(() => {
            $('#sampleShapes').ImageMapResize({ origImageWidth: '500' });
        });
    }

    URL = 'https://c1.staticflickr.com/5/4052/4503898393_303cfbc9fd_b.jpg';
    areas = [
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
    ];

    handleClick = (area) => {
        if (this.props.location.pathname !== area.path) {
            this.props.history.push(area.path);
        }
    };

    render() {
        return (
            <div className="InteractiveMap__root">
                <img
                    id="sampleShapes"
                    src={this.URL}
                    alt="Image Map Sample"
                    className="InteractiveMap__map"
                    useMap="#sampleShapesMap"
                />
                <map name="sampleShapesMap">
                    {this.areas.map(area => (
                        <area
                            key={area.id}
                            shape={area.shape}
                            alt={area.alt}
                            title={area.title}
                            coords={area.coords}
                            onClick={() => this.handleClick(area)}
                        />
                    ))}
                </map>
            </div>
        );
    }
}

InteractiveMap.propTypes = {
    location: shape({}).isRequired,
    history: shape({}).isRequired,
};

export default withRouter(InteractiveMap);
