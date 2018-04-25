import {bindActionCreators} from 'redux';
import {
    getTimetable
} from '../../../core/actions/mtgApi/mtgApi.actions';
import {
    appSetEventTagsFilter
} from '../../../core/actions/appContext/appContext.actions';

export default function dispatchToProps(dispatch) {
    return bindActionCreators({
        getTimetable,
        appSetEventTagsFilter
    }, dispatch);
}
