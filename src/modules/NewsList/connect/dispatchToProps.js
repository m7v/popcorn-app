import {bindActionCreators} from 'redux';
import {
    getNewsList
} from '../../../core/actions/mtgApi/mtgApi.actions';
import {
    appSetNewsTagsFilter
} from '../../../core/actions/appContext/appContext.actions';

export default function dispatchToProps(dispatch) {
    return bindActionCreators({
        getNewsList,
        appSetNewsTagsFilter,
    }, dispatch);
}
