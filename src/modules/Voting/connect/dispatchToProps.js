import {bindActionCreators} from 'redux';
import {
    getStands,
} from '../../../core/actions/mtgApi/mtgApi.actions';
import {
    appSetVote,
    getTicketCode,
} from '../../../core/actions/appContext/appContext.actions';

export default function dispatchToProps(dispatch) {
    return bindActionCreators({
        getStands,
        appSetVote,
        getTicketCode,
    }, dispatch);
}
