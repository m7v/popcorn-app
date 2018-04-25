import './NewsList.css';
import 'keyrune/css/keyrune.min.css';
import React from 'react';
import { connect } from 'react-redux';
import { bool, arrayOf, shape, func } from 'prop-types';
import map from 'lodash/map';
import classNames from 'classnames';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Chip from 'material-ui/Chip';
import Loader from '../../components/Loader';
import MetaHelmet from '../../components/MetaHelmet';
import stateToProps from './connect/stateToProps';
import dispatchToProps from './connect/dispatchToProps';
import ErrorPage from '../../components/ErrorPage';
import EventFilter from '../../components/EventFilter';

class NewsList extends React.PureComponent {

    state = {
        blocks: {}
    };

    componentWillMount() {
        this.props.getNewsList();
    }

    openBlock = (title) => {
        this.setState({
            blocks: {
                ...this.state.blocks,
                [title]: !this.state.blocks[title]
            }
        });
    };

    renderNews = () => map(this.props.news, (oneNews, index) => (
        <div key={index} className="NewsList__result">
            <Card>
                <CardMedia
                    className="NewsList__blockImage"
                    image={oneNews.image}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography type="headline" component="h2">
                        {oneNews.title}
                    </Typography>
                    <Typography component="p" align="left">{oneNews.text}</Typography>
                    <div className="NewsList__chips">
                        {oneNews.tags && oneNews.tags.map((tag, id) => (
                            <Chip
                                key={id}
                                label={tag.toUpperCase()}
                                className={
                                    classNames({
                                        'NewsList__chip': true,
                                        '_cyber': tag === 'cyber',
                                        '_geek': tag === 'geek',
                                        '_show': tag === 'show',
                                    })
                                }
                            />
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    ));

    render() {
        const { loading, error } = this.props;

        return (
            <section className="NewsList">
                <EventFilter
                    className={'NewsList__filter'}
                    tags={this.props.tags}
                    currentSet={{
                        name: 'Новости',
                        code: 'news'
                    }}
                    appSetTagsFilter={this.props.appSetNewsTagsFilter}
                    resultCount={this.props.news.length}
                />
                <MetaHelmet type={'news'} />
                <div className="NewsList__main">
                    {loading &&
                        <div className="NewsList__preloader">
                            <div className="NewsList__circular">
                                <Loader />
                            </div>
                        </div>
                    }
                    {!loading && error &&
                        <ErrorPage />
                    }
                    {!loading && !error &&
                        <div className="NewsList__results">
                            { this.renderNews() }
                        </div>
                    }
                </div>
            </section>
        );
    }
}

NewsList.propTypes = {
    loading: bool,
    error: bool,
    news: arrayOf(shape({})),
    tags: arrayOf(shape({})),
    getNewsList: func.isRequired,
    appSetNewsTagsFilter: func.isRequired,
};

NewsList.defaultProps = {
    isMobile: false,
    loading: false,
    error: false,
    news: [],
    tags: [],
};

export default connect(stateToProps, dispatchToProps)(NewsList);
