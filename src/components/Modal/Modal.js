import React, { Component } from 'react';

import classnames from 'classnames';
import { Icon } from 'semantic-ui-react';

import './styles/Modal.css';

class Modal extends Component {
  render() {
    const {
      children,
      className,
      classPrefix = 'niq-modal',
      open,
      onClose,
      title
    } = this.props;

    const containerCls = classnames(className, classPrefix);

    return (
      <div className={containerCls}>
        <div className={`${classPrefix}__wrapper`}>
          <div className={`${classPrefix}__title`}>
            {title}
            <div className={`${classPrefix}__close`} onClick={onClose}>
              <span className="niq-button__text">Close</span> <Icon name="close" /> 
            </div>
          </div>
          <div className={`${classPrefix}__content`}>
            {children}
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;