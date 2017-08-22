import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Button from 'terra-button';
import IconClose from 'terra-icon/lib/icon/IconClose';
import TerraPopup from 'terra-popup';
import styles from './NavHelpPopup.scss';

const cx = classNames.bind(styles);

const propTypes = {
  /**
   * Title to be rendered on top of the popup content
   */
  title: PropTypes.string,
  /**
   * Boolean value to hide/display popup header with title and close button
   */
  hasHeader: PropTypes.bool,
  /**
   * Content to be displayed in a dialog
   */
  popupContent: PropTypes.element,
  /**
   * Boolean value to render the popup
   */
  isOpen: PropTypes.bool,
  /**
   * Required callback function for use by parent component to update state.
   */
  closePopup: PropTypes.func,
};

const defaultProps = {
  hasHeader: false,
  isOpen: false,
  closePopup: null,
};

const NavHelpPopup = ({
 title,
 hasHeader,
 popupContent,
 isOpen,
 closePopup,
 ...customProps
}) => {
  const popupHeader = (hasHeader &&
    <div className={cx('popup-header')}>
      <div className={cx('popup-title')}>
        {title}
        <Button
          className={cx('close-button')}
          onClick={closePopup}
        >
          <IconClose className={cx('close-icon')} />
        </Button>
      </div>
    </div>);

  return (
    <TerraPopup
      {...customProps}
      isOpen={isOpen}
      onRequestClose={closePopup}
      isHeaderDisabled
    >
      <div>
        {popupHeader}
        {popupContent}
      </div>
    </TerraPopup>
  );
};

NavHelpPopup.propTypes = propTypes;
NavHelpPopup.defaultProps = defaultProps;

export default NavHelpPopup;