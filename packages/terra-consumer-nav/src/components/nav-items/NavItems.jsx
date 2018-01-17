import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import NavItem from './NavItem';
import navItemShape from '../../NavPropShapes';
import styles from './NavItem.scss';

const cx = classNames.bind(styles);

const propTypes = {
  navItems: PropTypes.arrayOf(
    PropTypes.shape(
      navItemShape,
      {
        /**
         * An optional array of objects to be displayed as sub navs toggled by the main nav.
         */
        subItems: PropTypes.arrayOf(PropTypes.shape(navItemShape)),
      },
    ),
  ),
  /**
   * Function to be applied on all nav links, excluding toggle headers.
  */
  handleClick: PropTypes.func,
  /**
   * The current route.
  */
  currentURL: PropTypes.string,
};

const defaultProps = {
  navItems: [],
};

class NavItems extends Component {
  constructor(props) {
    super(props);

    const initialIndex = props.navItems.findIndex(item => item.subItems && item.subItems.some(subItem => subItem.isActive));

    this.state = {
      openToggle: initialIndex,
    };

    this.handleToggle = this.handleToggle.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      const currentComponent = this;
      const currentURL = nextProps.currentURL;

      this.props.navItems.map((element, i) => {
        if (element.subItems) {
          element.subItems.map((item) => {
            if (currentURL === item.url) {
              currentComponent.setState({
                openToggle: i,
              });
            }
          });
        }
      });
    }
  }

  handleToggle(toggleId, isOpen) {
    this.setState({
      openToggle: isOpen ? toggleId : null,
    });
  }

  render() {
    const { navItems, handleClick, currentURL, ...customProps } = this.props;

    const content = navItems.map((element, i) => {
      let toggleProps = {};
      let subNavs = [];
      if (element.subItems) {
        // eslint-disable-next-line react/no-array-index-key
        subNavs = element.subItems.map((item, index) => <NavItem key={index} {...item} handleClick={handleClick} />);
        toggleProps = {
          isOpen: this.state.openToggle === i,
          handleToggle: this.handleToggle,
          toggleId: i,
        };
      }

      return (
        <NavItem
          key={element.text}
          url={element.url}
          text={element.text}
          icon={element.icon}
          target={element.target}
          isActive={element.isActive}
          isExternal={element.isExternal}
          badgeValue={element.badgeValue}
          handleClick={handleClick}
          {...toggleProps}
        >
          {subNavs}
        </NavItem>
      );
    });

    return (
      <div {...customProps} className={cx(customProps.className)}>
        {content}
      </div>
    );
  }
}

NavItems.propTypes = propTypes;
NavItems.defaultProps = defaultProps;

export default NavItems;
