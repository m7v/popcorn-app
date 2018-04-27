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
            $('#sampleShapes').ImageMapResize({ origImageWidth: '1080   ' });
        });
    }

    areas = [
        {
            alt: 'Стенд от кинотеатра Победа',
            title: 'Стенд от кинотеатра Победа',
            coords: [ 350, 520, 412, 520, 410, 596, 349, 599 ],
            shape: 'poly',
        },
        {
            alt: 'Релакс-зона Ай-Диво',
            title: 'Релакс-зона Ай-Диво',
            coords: [ 641, 43, 701, 43, 853, 193, 851, 514, 755, 419, 757, 238, 794, 199 ],
            shape: 'poly',
        },
        {
            alt: 'Главная сцена',
            title: 'Главная сцена',
            coords: [ 428, 426, 432, 594, 644, 597, 643, 427 ],
            shape: 'poly',
        },
        {
            alt: 'Стенд от кинотеатра Люксор',
            title: 'Стенд от кинотеатра Люксор',
            coords: [ 657, 519, 657, 597, 722, 598, 721, 519 ],
            shape: 'poly',
        },
        {
            alt: 'Зона VR от e2e4',
            title: 'Зона VR от e2e4',
            coords: [ 687, 658, 687, 597, 630, 597, 628, 659 ],
            shape: 'poly',
        },

        {
            path: 31,
            alt: 'Фудкорт',
            title: 'Фудкорт',
            coords: [ 377, 40, 379, 279, 756, 281, 754, 239, 794, 199, 636, 40 ],
            shape: 'poly',
        },
        {
            path: 32,
            alt: 'Бар 18+',
            title: 'Бар 18+',
            coords: [ 224, 192, 223, 426, 374, 275, 372, 41 ],
            shape: 'poly',
        },
        {
            path: 25,
            alt: 'Зона Fortinte',
            title: 'Зона Fortinte',
            coords: [ 378, 630, 629, 631, 628, 599, 379, 597 ],
            shape: 'poly',
        },
        {
            path: 23,
            alt: 'Зона PS4 от СФКС',
            title: 'Зона PS4 от СФКС',
            coords: [ 225, 618, 125, 618, 124, 666, 225, 667 ],
            shape: 'poly',
        },
        {
            path: 24,
            alt: 'VR Skyy Arena',
            title: 'VR Skyy Arena',
            coords: [ 244, 671, 244, 732, 126, 729, 126, 670 ],
            shape: 'poly',
        },
        {
            path: 22,
            alt: 'Hearthstone',
            title: 'Hearthstone',
            coords: [ 122, 878, 236, 770, 284, 825, 195, 906, 150, 905 ],
            shape: 'poly',
        },
        {
            path: 2,
            alt: 'Overwatch',
            title: 'Overwatch',
            coords: [ 126, 906, 324, 903, 323, 966, 127, 961 ],
            shape: 'poly',
        },
        {
            path: 27,
            alt: 'Инди-шоукейсы',
            title: 'Инди-шоукейсы',
            coords: [ 188, 976, 367, 979, 367, 1141 ],
            shape: 'poly',
        },
        {
            path: 26,
            alt: 'Золотой VIP-лаунж',
            title: 'Золотой VIP-лаунж',
            coords: [ 125, 971, 173, 972, 365, 1145, 369, 1204, 127, 1200 ],
            shape: 'poly',
        },
        {
            path: 20,
            alt: 'Аллея Авторов',
            title: 'Аллея Авторов',
            coords: [ 369, 1205, 536, 1202, 534, 1138, 709, 1140, 710, 1248, 633, 1328, 633, 1547, 446, 1547, 448, 1328, 368, 1249 ],
            shape: 'poly',
        },
        {
            alt: 'Гикторий',
            path: 1,
            title: 'Гикторий',
            coords: [ 121, 1212, 366, 1211, 366, 1250, 447, 1329, 443, 1549, 367, 1627, 124, 1631 ],
            shape: 'poly',
        },
        {
            path: 9,
            alt: 'Варгеймы',
            title: 'Варгеймы',
            coords: [ 803, 1150, 952, 1147, 952, 1412, 803, 1411 ],
            shape: 'poly',
        },
        {
            path: 10,
            alt: 'Настольные ролевые игры',
            title: 'Настольные ролевые игры',
            coords: [ 803, 1414, 803, 1712, 956, 1714, 952, 1414 ],
            shape: 'poly',
        },
        {
            path: 19,
            alt: 'Настольные игры',
            title: 'Настольные игры',
            coords: [ 799, 1144, 714, 1144, 714, 1248, 637, 1332, 638, 1551, 786, 1707, 800, 1707 ],
            shape: 'poly',
        },
        {
            path: 28,
            alt: 'Фотозона',
            title: 'Фотозона',
            coords: [ 481, 1649, 483, 1691, 596, 1691, 594, 1650 ],
            shape: 'poly',
        },
        {
            path: 4,
            alt: 'Новая реальность',
            title: 'Новая реальность',
            coords: [ 370, 688, 434, 688, 434, 752, 371, 751 ],
            shape: 'poly',
        },
        {
            path: 7,
            alt: 'Первому игроку приготовиться',
            title: 'Первому игроку приготовиться',
            coords: [ 380, 780, 382, 826, 485, 825, 484, 781 ],
            shape: 'poly',
        },
        {
            path: 11,
            alt: 'Just Dance ',
            title: 'Just Dance ',
            coords: [ 484, 774, 533, 725, 598, 788, 533, 856, 485, 825 ],
            shape: 'poly',
        },
        {
            path: 12,
            alt: 'Историческое дуэльное фехтование',
            title: 'Историческое дуэльное фехтование',
            coords: [ 819, 734, 950, 735, 950, 876, 820, 876 ],
            shape: 'poly',
        },
        {
            path: 13,
            alt: 'Warp Zone',
            title: 'Warp Zone',
            coords: [ 399, 983, 493, 983, 494, 1076, 398, 1077 ],
            shape: 'poly',
        },
        {
            path: 14,
            alt: 'Star Wars',
            title: 'Star Wars',
            coords: [ 397, 855, 526, 857, 523, 949, 397, 948 ],
            shape: 'poly',
        },
        {
            path: 15,
            alt: 'Башня мага',
            title: 'Башня мага',
            coords: [ 679, 938, 791, 938, 794, 1092, 677, 1091 ],
            shape: 'poly',
        },
        {
            path: 16,
            alt: 'Игра престолов',
            title: 'Игра престолов',
            coords: [ 788, 942, 877, 877, 952, 953, 882, 1029 ],
            shape: 'poly',
        },
        {
            path: 17,
            alt: 'Millenium of Changes',
            title: 'Millenium of Changes',
            coords: [ 397, 1171, 492, 1174, 494, 1078, 398, 1080 ],
            shape: 'poly',
        },
        {
            path: 18,
            alt: 'Черное солнце',
            title: 'Черное солнце',
            coords: [ 539, 983, 635, 981, 633, 1075, 537, 1076 ],
            shape: 'poly',
        },
        {
            path: 21,
            alt: 'Pokemon Cafe',
            title: 'Pokemon Cafe',
            coords: [ 837, 1031, 952, 1032, 952, 1141, 839, 1140 ],
            shape: 'poly',
        },
        {
            path: 29,
            alt: 'Western siberia tattoo',
            title: 'Western siberia tattoo',
            coords: [ 585, 860, 654, 860, 654, 899, 585, 899 ],
            shape: 'poly',
        },
        {
            path: 30,
            alt: 'Cult',
            title: 'Cult',
            coords: [ 584, 918, 640, 918, 641, 949, 587, 950 ],
            shape: 'poly',
        },
        {
            path: 33,
            alt: 'Ярмарочная зона',
            title: 'Ярмарочная зона',
            coords: [ 648, 754, 648, 813, 676, 816, 678, 909, 756, 909, 756, 845, 728, 845, 729, 752 ],
            shape: 'poly',
        },
    ];

    handleClick = (area) => {
        if (!!area.path && this.props.location.pathname !== area.path) {
            this.props.history.push(`/location/${area.path}`);
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
