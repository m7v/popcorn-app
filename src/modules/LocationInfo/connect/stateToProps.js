import { createSelector } from 'reselect';
import moment from 'moment';
import map from 'lodash/map';
import filter from 'lodash/filter';

const getLocationInfo = (state) => state.appContext.LocationInfo.data;
const getFavoritesLocation = (state) => state.favorites.locationItems;

const locationSelector = createSelector([
    getLocationInfo
], locations => locations);

const favoriteSelector = createSelector([
    getFavoritesLocation
], favorites => favorites);

const getLocation = (locations, locationId) => locations[locationId] || {};
const isFavorite = (locations, locationId) => !!locations[locationId];

export function stateToProps(state, props) {
    const location = getLocation(locationSelector(state), props.locationId);

    const now = parseInt(moment().valueOf() / 1000, 10);
    location.events = map(filter(location.events, event => event.period.endTime >= now), event => ({
        ...event,
        isCurrent: now >= event.period.startTime && now <= event.period.endTime
    }));

    return {
        locationId: props.locationId,
        location,
        isFavorite: isFavorite(favoriteSelector(state), props.locationId),
        isMobile: state.appContext.isMobile,
        loading: state.appContext.Cards.loading,
        error: state.appContext.Cards.error,
    };
}
