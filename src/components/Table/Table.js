import React, { Component } from 'react';

import classnames from 'classnames';

import './styles/Table.css';

class Table extends Component {
  constructor(props) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(data) {
    const {
      onSelect
    } = this.props;

    if (onSelect) {
      onSelect(data);
    }
  }

  render() {
    const {
      className,
      classPrefix,
      headers,
      rows
    } = this.props;

    const tableCls = classnames(className, classPrefix);

    return (
      <div className={tableCls}>
        <div className={`${classPrefix}__header`}>
          {headers.map(({ className, label }) => {
            const columnCls = classnames(`${classPrefix}__header-title`, className);

            return (
              <span className={columnCls}>
                {label}
              </span>
            );
          })}
        </div>
        <div className={`${classPrefix}__body`}>
          {rows.map(({ className, columns, data }) => {
            const rowCls = classnames(`${classPrefix}__row`, className);

            return (
              <div className={rowCls} onClick={() => this.onSelect(data)}>
                {columns.map(({ className: columnClass, value }) => {
                  const columnCls = classnames(`${classPrefix}__column`, columnClass);
                  
                  return (
                    <span className={columnCls}>
                      {value}
                    </span>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

Table.defaultProps = {
  className: 'niq-table',
  classPrefix: 'niq-table'
};

export default Table;
