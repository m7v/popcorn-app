import './InteractiveMap.css';
import $ from 'jquery';
import React from 'react';
import { shape } from 'prop-types';
import './lib/map';
import map from './assets/map.jpg';
import withRouter from 'react-router-dom/withRouter';

class InteractiveMap extends React.Component {
    componentWillMount() {
        $(document).ready(() => {
            $('#sampleShapes').ImageMapResize({ origImageWidth: '549' });
        });
    }

    // URL = mapSkeleton;

    // areas = [
    //     {
    //         alt: 'Фудкорт',
    //         title: 'Фудкорт',
    //         path: '',
    //         coords: [ 378, 48, 688, 46, 869, 226, 819, 263, 824, 333, 379, 333 ],
    //         shape: 'poly',
    //     },
    //     {
    //         alt: 'Overwatch',
    //         title: 'Overwatch',
    //         path: '',
    //         coords: [ 91, 1056, 93, 1127, 313, 1123, 312, 1059 ],
    //         shape: 'poly',
    //     },
    //     {
    //         alt: 'Hearthstone',
    //         title: 'Hearthstone',
    //         path: '',
    //         coords: [ 95, 1026, 135, 1062, 211, 988, 167, 946 ],
    //         shape: 'poly',
    //     },
    //     {
    //         alt: 'Зона VR Sky Arena',
    //         title: 'Зона VR Sky Arena',
    //         path: '',
    //         coords: [ 114, 856, 113, 928, 182, 931, 184, 859 ],
    //         shape: 'poly',
    //     },
    //     {
    //         alt: 'Зона PS4 от СФКС',
    //         title: 'Зона PS4 от СФКС',
    //         path: '',
    //         coords: [ 93, 785, 167, 784, 165, 854, 93, 859 ],
    //         shape: 'poly',
    //     },
    //     {
    //         alt: 'Зона Fortine',
    //         title: 'Зона Fortine',
    //         path: '',
    //         coords: [ 377, 702, 664, 729 ],
    //         shape: 'rect',
    //     },
    //     {
    //         alt: 'Зона VR от е2е4',
    //         title: 'Зона VR от е2е4',
    //         path: '',
    //         coords: [ 666, 693, 746, 765 ],
    //         shape: 'rect',
    //     },
    //     {
    //         alt: 'Главная сцена',
    //         title: 'Главная сцена',
    //         path: '',
    //         coords: [ 342, 607, 536, 602, 535, 549, 588, 548, 589, 600, 783, 600, 783, 691, 342, 695 ],
    //         shape: 'poly',
    //     },
    //     {
    //         alt: 'Аллея Авторов',
    //         title: 'Аллея Авторов',
    //         path: '',
    //         coords: [ 368, 1364, 523, 1372, 521, 1324, 746, 1326, 747, 1446, 663, 1536, 660, 1787, 462, 1792, 458, 1541, 368, 1451 ],
    //         shape: 'poly',
    //     },
    //     {
    //         alt: 'Варгеймы',
    //         title: 'Варгеймы',
    //         path: '',
    //         coords: [ 750, 1328, 1019, 1323, 1022, 1515, 750, 1517 ],
    //         shape: 'poly',
    //     },
    //     {
    //         alt: 'Настольные Ролевые Игры',
    //         title: 'Настольные Ролевые Игры',
    //         path: '',
    //         coords: [ 756, 1520, 1023, 1756 ],
    //         shape: 'rect',
    //     },
    //     {
    //         alt: 'Настольные игры',
    //         title: 'Настольные игры',
    //         path: '',
    //         coords: [ 747, 1451, 664, 1537, 659, 1794, 839, 1977, 1021, 1973, 1022, 1757, 750, 1759 ],
    //         shape: 'poly',
    //     },
    //     {
    //         alt: 'VIP-лаунж',
    //         title: 'VIP-лаунж',
    //         path: '',
    //         coords: [ 95, 1133, 144, 1131, 367, 1346, 367, 1398, 95, 1399 ],
    //         shape: 'poly',
    //     },
    //     {
    //         alt: 'Шоукейсы',
    //         title: 'Шоукейсы',
    //         path: '',
    //         coords: [ 153, 1131, 371, 1133, 370, 1344 ],
    //         shape: 'poly',
    //     },
    // ];

    areas = [
        {
            id: '1',
            alt: 'Фудкорт',
            title: 'Фудкорт',
            path: '',
            coords: [ 381, 338, 171, 299 ],
            shape: 'rect',
        },
        {
            id: '2',
            alt: 'Overwatch',
            title: 'Overwatch',
            path: '',
            coords: [153,550,45,516],
            shape: 'rect',
        },
    ];

    handleClick = (area) => {
        if (this.props.location.pathname !== area.path) {
            this.props.history.push(area.path);
        }
    };

    render() {
        return (
            <div className="InteractiveMap__root">
                <section className="InteractiveMap__container">
                    <div className="InteractiveMap__result">
                        <img
                            id="sampleShapes"
                            src={map}
                            alt="Map"
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
                </section>
            </div>
        );
    }
}

InteractiveMap.propTypes = {
    location: shape({}).isRequired,
    history: shape({}).isRequired,
};

export default withRouter(InteractiveMap);
