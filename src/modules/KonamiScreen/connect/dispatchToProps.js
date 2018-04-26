import {bindActionCreators} from 'redux';
import {
    saveTicketCode,
    getTicketCode
} from '../../../core/actions/appContext/appContext.actions';

export default function dispatchToProps(dispatch) {
    return bindActionCreators({
        saveTicketCode,
        getTicketCode,
    }, dispatch);
}
