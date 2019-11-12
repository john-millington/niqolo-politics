import React, { Component } from 'react';
import classnames from 'classnames';

class HeadlineResult extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  
  onClick() {
    const {
      onSelect,
      party,
      selected
    } = this.props;

    if (onSelect) {
      onSelect(selected ? null : party);
    }
  }

  render() {
    const {
      results: {
        change: changes,
        headline
      },
      party,
      selected
    } = this.props;

    const count = headline[party];
    const change = changes[party];

    const containerCLs = classnames('niq-headline__item', party.toLowerCase(), {
      ['niq-headline__item--selected']: selected
    });

    return (
      <div key={`${party}__result`} className={containerCLs} onClick={this.onClick} >
        <span className="niq-headline__item-title">
          {party}
        </span>
        <span className="niq-headline__item-value">
          {count}
        </span>
        <span className="niq-headline__item-change">
          ({change > 0 ? `+${change}` : change})
        </span>
      </div>
    );
  }
}

export default HeadlineResult;