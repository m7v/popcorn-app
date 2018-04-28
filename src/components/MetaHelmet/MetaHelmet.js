import React from 'react';
import { Helmet } from 'react-helmet';
import { string, shape } from 'prop-types';
import isEmpty from 'lodash/isEmpty';

class MetaHelmet extends React.PureComponent {

    render() {
        const {type, set, card } = this.props;

        switch (type) {
            case 'news':
                return (
                    <Helmet>
                        <title>{'Новости | PopCorn\'18'}</title>
                        <link rel="canonical" href={'https://m7v.github.io/suggester/#/browse'} />
                        <meta name="twitter:title" content={'Новости | PopCorn\'18'} />
                        <meta property="og:title" content={'Новости | PopCorn\'18'} />
                    </Helmet>
                );
            case 'schedule':
                return (
                    <Helmet>
                        <title>{'Расписание | PopCorn\'18'}</title>
                        <link rel="canonical" href={'https://m7v.github.io/suggester/#/browse'} />
                        <meta name="twitter:title" content={'Расписание | PopCorn\'18'} />
                        <meta property="og:title" content={'Расписание | PopCorn\'18'} />
                    </Helmet>
                );

            case 'decks':
                return (
                    <Helmet>
                        <title>{'Decks | Popcorn Festival'}</title>
                        <meta name="twitter:title" content={'Decks | Popcorn Festival'} />
                        <meta property="og:title" content={'Decks | Popcorn Festival'} />
                    </Helmet>
                );
            case 'favorites':
                return (
                    <Helmet>
                        <title>{'Favorites | Popcorn Festival'}</title>
                        <meta name="twitter:title" content={'Favorites | Popcorn Festival'} />
                        <meta property="og:title" content={'Favorites | Popcorn Festival'} />
                    </Helmet>
                );
            case 'deckbuilder':
                return (
                    <Helmet>
                        <title>{'Deck builder | Popcorn Festival'}</title>
                        <link rel="canonical" href={'https://m7v.github.io/suggester/#/browse'} />
                        <meta name="twitter:title" content={'Deck builder | Popcorn Festival'} />
                        <meta property="og:title" content={'Deck builder | Popcorn Festival'} />
                    </Helmet>
                );
            case 'sets':
                return (
                    <Helmet>
                        <title>{'Sets | Popcorn Festival'}</title>
                        <link rel="canonical" href={'https://m7v.github.io/suggester/#/browse'} />
                        <meta name="twitter:title" content={'Sets | Popcorn Festival'} />
                        <meta property="og:title" content={'Sets | Popcorn Festival'} />
                    </Helmet>
                );
            case 'set':
                return (
                    !isEmpty(set) &&
                        <Helmet>
                            <title>{`${set.name} | Popcorn Festival`}</title>
                            <link rel="canonical" href={`https://m7v.github.io/suggester/#/browse/${set.code}`} />
                            <meta name="twitter:title" content={`${set.name} | Popcorn Festival`} />
                        </Helmet>
                );
            case 'card':
                return (
                    !isEmpty(card) &&
                        <Helmet>
                            <title>{`${card.name} | Popcorn Festival`}</title>
                            <link rel="canonical" href={`https://m7v.github.io/suggester/#/cards/${card.id}`} />
                            <meta name="twitter:image" content={card.imageUrl} />
                            <meta name="twitter:title" content={`${card.name} | Popcorn Festival`} />
                            <meta property="og:image" content={card.imageUrl} />
                            <meta property="og:title" content={`${card.name} | Popcorn Festival`} />
                        </Helmet>
                );
            case 'search':
                return (
                    <Helmet>
                        <title>{'Search Card | Popcorn Festival'}</title>
                        <meta name="twitter:title" content={'Search Card | Popcorn Festival'} />
                        <meta property="og:title" content={'Search Card | Popcorn Festival'} />
                    </Helmet>
                );
            default:
                return (
                    <Helmet>
                        <title>{'Popcorn Festival'}</title>
                        <meta name="twitter:title" content={'Popcorn Festival'} />
                        <meta property="og:title" content={'Popcorn Festival'} />
                    </Helmet>
                );
        }

    }
}

MetaHelmet.propTypes = {
    type: string.isRequired,
    card: shape({}),
    set: shape({}),
};

MetaHelmet.defaultProps = {
    card: {},
    set: {},
};

export default MetaHelmet;
