import './NewsList.css';
import 'keyrune/css/keyrune.min.css';
import React from 'react';
import { connect } from 'react-redux';
import { bool, arrayOf, shape, func } from 'prop-types';
import map from 'lodash/map';
import classNames from 'classnames';
import Typography from 'material-ui/Typography';
import Chip from 'material-ui/Chip';
import Dialog, { DialogActions, DialogContent } from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import Loader from '../../components/Loader';
import MetaHelmet from '../../components/MetaHelmet';
import stateToProps from './connect/stateToProps';
import dispatchToProps from './connect/dispatchToProps';
import ErrorPage from '../../components/ErrorPage';
import EventFilter from '../../components/EventFilter';
import SimpleImg from '../../components/SimpleImg';

class NewsList extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            newsId: '',
        };
    }

    componentWillMount() {
        this.props.getNewsList();
    }

    handleOpenNews = (newsId) => {
        this.setState({
            open: true,
            newsId
        });
    };

    handleClose = () => {
        this.setState({
            open: false,
            newsId: ''
        });
    };

    renderNews = () => map(this.props.news, (oneNews, index) => (
        <div key={index} className="NewsList__result">
            <Dialog
                fullScreen
                open={this.state.open}
                onRequestClose={this.handleClose}
            >
                <DialogActions className="NewsList__actions">
                    <Button className="NewsList__closeButton" color="primary" onClick={this.handleClose}>
                        <span className="NewsList__button">
                            Закрыть
                        </span>
                    </Button>
                </DialogActions>
                <DialogContent className="NewsList__drawer">
                    {this.props.news[this.state.newsId] && this.props.news[this.state.newsId].text &&
                        <div
                            className="NewsList__blockDescription"
                            dangerouslySetInnerHTML={{ __html: this.props.news[this.state.newsId].text }}
                        />
                    }
                </DialogContent>
            </Dialog>
            <div>
                <div className="NewsList__blockImage">
                    <SimpleImg imageUrl={oneNews.image} />
                </div>
                <div>
                    <Typography type="headline" component="h2">
                        {oneNews.title}
                    </Typography>
                    <div className="NewsList__readNews" onClick={() => this.handleOpenNews(index)} >
                        Читать
                    </div>
                    <div className="NewsList__chips">
                        {map(oneNews.tags, (tag, id) => (
                            <Chip
                                key={id}
                                label={`#${tag.toUpperCase()}`}
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
                </div>
            </div>
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
