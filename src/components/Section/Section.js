import React, { Component } from 'react';
import classnames from 'classnames';

import './styles/Section.css';

class Section extends Component {
  render() {
    const {
      children,
      className,
      classPrefix,
      title
    } = this.props;

    const sectionCls = classnames(className, classPrefix);
    
    return (
      <div className={sectionCls}>
        <div className={`${classPrefix}__title`}>
          {title}
        </div>
        <div className={`${classPrefix}__content`}>
          {children}
        </div>
      </div>
    );
  }
}

Section.defaultProps = {
  className: 'niq-section',
  classPrefix: 'niq-section'
};

export default Section;
