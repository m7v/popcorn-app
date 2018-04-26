const getTicketCode = function(state) {
    return state.appContext.TicketCode.code;
};

export default function stateToProps(state) {
    return {
        ticketCode: getTicketCode(state),
    };
}
