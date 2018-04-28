import { createSelector } from 'reselect';
import moment from 'moment';
import sortBy from 'lodash/sortBy';
import filter from 'lodash/filter';
import map from 'lodash/map';
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
    const now = parseInt(moment().valueOf() / 1000, 10);

    const events = map(filter(getEventsByFilter(state), event => event.period.endTime >= now), event => ({
        ...event,
        isCurrent: now >= event.period.startTime && now <= event.period.endTime
    }));

    return {
        isMobile: state.appContext.isMobile,
        timetable: events,
        tags: getTagsFilter(state),
        loading: state.appContext.Timetable.loading,
        error: state.appContext.Timetable.error,
    };
}
