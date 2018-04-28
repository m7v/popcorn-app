import './EventFilter.css';
import React from 'react';
import { func, shape, string, number } from 'prop-types';
import classNames from 'classnames';
import map from 'lodash/map';
import values from 'lodash/values';
import reduce from 'lodash/reduce';
import isEmpty from 'lodash/isEmpty';
import compact from 'lodash/compact';
import debounce from 'lodash/debounce';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import IconFilter from 'material-ui-icons/FilterList';
import Drawer from 'material-ui/Drawer';
import Badge from 'material-ui/Badge';

const tagsMap = {
    cyber: 'cyber',
    show: 'show',
    geek: 'geek',
};

class EventFilter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {open: false};
    }

    handleToggle = () => this.setState({open: !this.state.open});

    pluralFormat = (count) => {
        switch (true) {
            case count === 1:
                return `${count} результат`;
            case count === 2:
            case count === 3:
            case count === 4:
                return `${count} результата`;
            default:
                return `${count} результатов`;
        }
    };

    appSetTagsFilter = rareType => () => {
        this.props.appSetTagsFilter({[rareType]: !this.props.tags[rareType]});
    };

    renderTagsFilter = tagsTypes => map(tagsTypes, (type, tagType) => {
        const iconClass = classNames({
            'EventFilter__tags': true,
            [`ss-${tagType}`]: !!this.props.tags[tagType],
        });
        return (
            <Button
                key={type}
                color="contrast"
                className="EventFilter__icon"
                onClick={debounce(this.appSetTagsFilter(tagType), 100)}
            >
                <span className={iconClass}>
                    {tagsTypes[tagType]}
                </span>
            </Button>
        );
    });


    render() {
        const { tags, className, currentSet, resultCount } = this.props;
        const hasTagsFilter = compact(values(tags)).length;
        const iconStyle = classNames({
            'EventFilter__icon': true,
            '_active': hasTagsFilter
        });
        const countActiveFilters = reduce(tags, (count, tag) => {
            return tag ? count + 1 : count + 0;
        }, 0);

        return (
            <div className={className || 'EventFilter__root'}>
                <IconButton className={iconStyle} onClick={this.handleToggle}>
                    {!!countActiveFilters &&
                        <Badge badgeContent={countActiveFilters} color="primary">
                            <IconFilter />
                        </Badge>
                    }
                    {!countActiveFilters &&
                        <IconFilter />
                    }
                </IconButton>
                <Drawer
                    anchor='top'
                    open={this.state.open}
                    onRequestClose={this.handleToggle}
                >
                    <div className="EventFilter__inputWrapper">
                        <div className="EventFilter__form">
                            {!isEmpty(currentSet) &&
                                <div className="EventFilter__header">
                                    {/*currentSet.code &&*/
                                        // <IconSet set={this.props.currentSet.code} rarity="common" isGradient />
                                    }
                                    <span className="EventFilter__headerTitle">{currentSet.name}</span>
                                </div>
                            }
                            <div className="EventFilter__inputTagsFilter">
                                { this.renderTagsFilter(tagsMap) }
                            </div>
                            <div className="EventFilter__result">
                                { this.pluralFormat(resultCount) }
                            </div>
                        </div>
                    </div>
                </Drawer>
            </div>
        );
    }
}

EventFilter.propTypes = {
    resultCount: number,
    className: string,
    currentSet: shape({ code: string }),
    tags: shape({}).isRequired,
    appSetTagsFilter: func.isRequired,
};

EventFilter.defaultProps = {
    className: '',
    currentSet: {},
    resultCount: 0,
};

export default EventFilter;
