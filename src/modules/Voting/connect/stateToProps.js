const getTicketCode = function(state) {
    return state.appContext.TicketCode.code;
};

const getStandsToState = function(state) {
    return state.appContext.Stands.data;
};

export default function stateToProps(state) {
    return {
        ticketCode: getTicketCode(state),
        stands: getStandsToState(state)
    };
}
