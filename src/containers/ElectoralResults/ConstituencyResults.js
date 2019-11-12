import React, { Component } from 'react';
import { cloneDeep } from 'lodash';

import './styles/ConstituencyResults.css';
import ConstituencyDetails from './ConstituencyDetails';

class ConstituencyResults extends Component {
  state = {
    constituency: null
  };
  
  constructor(props) {
    super(props);
    this.onSelectConstituency = this.onSelectConstituency.bind(this);
  }

  onSelectConstituency(constituency) {
    return () => {
      let update = constituency;
      if (this.state.constituency && this.state.constituency === update) {
        update = null;
      }

      this.setState({
        constituency: update
      });
    }
  }

  getConstituencies() {
    const {
      region,
      results
    } = this.props;

    if (region) {
      const clone = cloneDeep(results.constituencies);
      Object.keys(clone).forEach(constituency => {
        if (clone[constituency].region !== region) {
          delete clone[constituency];
        }
      });

      return clone;
    }

    return results.constituencies;
  }

  render() {
    const {
      party,
      region,
      onReset
    } = this.props;

    const constituencies = this.getConstituencies();

    return (
      <div className="niq-constituency-results">
        <div className="niq-constituency-results__title-container">
          <div className="niq-constituency-results__title-back" onClick={() => onReset()}>
            UK
          </div>
          <div className="niq-constituency-results__title-name">
            {this.props.region}
          </div>
        </div>
        <div className="niq-constituency-results__section">
          <div className="niq-constituency-results__section-title">Changes</div>
          <div className="niq-constituency-results__section-items">
            {Object.keys(constituencies).map(name => {
              const result = constituencies[name];
              if (result.winner === result.previous) {
                return null;
              }

              if (party && result.winner !== party && result.previous !== party) {
                return null;
              }

              return (
                <div className="niq-result__item" onClick={this.onSelectConstituency(name)}>
                  <span className="niq-result__change">
                    <span className={`niq-tag ${result.previous.toLowerCase()}`}>{result.previous}</span>
                    ->
                    <span className={`niq-tag ${result.winner.toLowerCase()}`}>{result.winner}</span>
                  </span>
                  <span className="niq-result__name">{name}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="niq-constituency-results__section">
          <div className="niq-constituency-results__section-title">Holds</div>
          <div className="niq-constituency-results__section-items">
            {Object.keys(constituencies).map(name => {
              const result = constituencies[name];
              if (result.winner !== result.previous) {
                return null;
              }

              if (party && result.winner !== party) {
                return null;
              }

              return (
                <div className="niq-result__item" onClick={this.onSelectConstituency(name)}>
                  <span className="niq-result__change">
                    <span className={`niq-tag niq-tag-hold ${result.winner.toLowerCase()}`}>{result.winner} HOLD</span>
                  </span>
                  <span className="niq-result__name">{name}</span>
                </div>
              );
            })}
          </div>
        </div>
        <ConstituencyDetails
          constituency={this.state.constituency}
          onClose={this.onSelectConstituency(null)}
          results={this.props.results}
        />
      </div>
    );
  }
}

export default ConstituencyResults;
