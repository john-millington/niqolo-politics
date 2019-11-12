import React, { Component } from 'react';
import './styles/RegionalResults.css';

class RegionalResults extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(region) {
    return () => {
      const {
        onSelect
      } = this.props;

      if (onSelect) {
        onSelect(region);
      }
    }
  }

  render() {
    const {
      results: {
        regions
      }
    } = this.props;

    return (
      <div className="niq-regional-results">
        {Object.keys(regions).map(region => {
          if (this.props.party !== null) {
            if (!regions[region][this.props.party]) {
              return null;
            }
          }

          return (
            <div className="niq-region" onClick={this.onClick(region)}>
              <div className="niq-region__title">
                {region}
              </div>
              <div className="niq-regional__breakdown">
                {Object.keys(regions[region]).sort((primary, secondary) => {
                  if (regions[region][primary] > regions[region][secondary]) {
                    return -1;
                  }

                  return 1;
                }).map(party => {
                  const count = regions[region][party];

                  return (
                    <div className={`niq-regional__item ${party.toLowerCase()}-contrast`}>
                      <span className="niq-regional__item-name">{party}</span>
                      <span className="niq-regional__item-value">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )
        })}
      </div>
    );
  }
}

export default RegionalResults;
