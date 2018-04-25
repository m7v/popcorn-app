import './SimpleImg.css';
import React from 'react';
import classNames from 'classnames';
import { string, bool } from 'prop-types';
import Img from 'react-image';
import DefaultImg from '../../components/DefaultImg';

class SimpleImg extends React.PureComponent {

    componentDidUpdate() {

    }

    render() {
        const { imageUrl, foil } = this.props;

        return (
            <div className="SimpleImg__root">
                <Img
                    className={classNames({
                        'SimpleImg__img': true,
                        '_default': true,
                        '_foil': foil
                    })}
                    src={imageUrl}
                    loader={<DefaultImg />}
                    unloader={<DefaultImg />}
                />
            </div>
        );
    }
}

SimpleImg.propTypes = {
    foil: bool,
    imageUrl: string.isRequired,
};

SimpleImg.defaultProps = {
    oversize: false,
    foil: false,
};

export default SimpleImg;
