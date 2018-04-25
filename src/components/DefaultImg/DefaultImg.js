import './DefaultImg.css';
import React from 'react';
import classNames from 'classnames';
import defaultCard from './assets/default.jpg';

const DefaultImg = () => (
    <img
        className={classNames({
            'DefaultImg__img': true,
            '_default': true,
        })}
        src={defaultCard}
        alt={'PopCorn'}
    />
);

DefaultImg.defaultProps = {
    oversize: false,
};

export default DefaultImg;
