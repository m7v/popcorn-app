import { createSelector } from 'reselect';
import sortBy from 'lodash/sortBy';
import {
    createEventFilter,
    getActivePopcornFilter,
} from '../../../core/helpers/filter.helper';

const newsSelector = function(state) {
    return state.appContext.News;
};

const newsListSelector = createSelector(newsSelector, news => news.data);
const getTagsFilter = (state) => state.appContext.News.filters.tags;

const getNewsByFilter = createSelector(
    [newsListSelector, getTagsFilter],
    (events, tagsFilter) => {
        const selectedTagsFilters = getActivePopcornFilter(tagsFilter);
        const filterByTags = createEventFilter(selectedTagsFilters, 'tags');

        return sortBy(filterByTags(events), (event) => event.date);
    }
);

export default function stateToProps(state) {
    return {
        isMobile: state.appContext.isMobile,
        news: getNewsByFilter(state),
        tags: getTagsFilter(state),
        loading: state.appContext.News.loading,
        error: state.appContext.News.error,
    };
}
