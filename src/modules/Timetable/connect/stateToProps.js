import { createSelector } from 'reselect';
import sortBy from 'lodash/sortBy';
import {
    createEventFilter,
    getActivePopcornFilter,
} from '../../../core/helpers/filter.helper';

const eventsSelector = function(state) {
    return state.appContext.Timetable;
};

const eventSelector = createSelector(eventsSelector, timetable => timetable.data);
const getTagsFilter = (state) => state.appContext.Timetable.filters.tags;

const getEventsByFilter = createSelector(
    [eventSelector, getTagsFilter],
    (events, rarityFilter) => {
        const selectedRarityFilters = getActivePopcornFilter(rarityFilter);
        const filterByTags = createEventFilter(selectedRarityFilters, 'tags');

        return sortBy(filterByTags(events), (event) => event.period.startTime);
    }
);

export default function stateToProps(state) {
    return {
        isMobile: state.appContext.isMobile,
        timetable: getEventsByFilter(state),
        tags: getTagsFilter(state),
        loading: state.appContext.Timetable.loading,
        error: state.appContext.Timetable.error,
    };
}
