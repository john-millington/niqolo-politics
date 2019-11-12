import React, { Component } from 'react';
import './styles/ConstituencyDetails.css';

const PARTY_MAPPINGS = {
  'CON': 'The Conservative Party',
  'LAB': 'The Labour Party',
  'LIB': 'The Liberal Democrats',
  'BXP': 'The Brexit Party',
  'GRN': 'The Green Party',
  'SNP': 'The Scottish National Party',
  'PLC': 'Plaid Cymru',
  'UUP': 'The Ulster Unionist Party',
  'SDLP': 'The SDLP',
  'DUP': 'The DUP',
  'SF': 'Sinn Fein',
  'ALL': 'The Alliance Party'
}

class ConstituencyDetails extends Component {
  renderDetails() {
    const {
      constituency,
      results: {
        constituencies
      }
    } = this.props;

    const {
      details,
      previous,
      winner
    } = constituencies[constituency];

    const sorted = details.years.sort((primary, secondary) => {
      if (primary > secondary) {
        return -1;
      }

      return 1;
    });

    const wins = {};
    sorted.forEach(year => {
      const outcome = { party: '', share: 0 };
      Object.keys(details.constituency).forEach(party => {
        if (details.constituency[party][year]) {
          const percentage = details.constituency[party][year];
          if (percentage > outcome.share) {
            outcome.party = party;
            outcome.share = percentage;
          }
        }
      });

      if (!wins[outcome.party]) {
        wins[outcome.party] = 0;
      }

      wins[outcome.party] += 1;
    });

    const outcome_text = winner === previous ? 'hold' : 'gain';
    let trend_text = 'about the same here as';
    if (details.deltas[winner] > 1.2) {
      if (details.deltas[winner] > 2) {
        trend_text = 'a lot better here than';
      } else {
        trend_text = 'better here than';
      }
    } else if (details.deltas[winner] < 0.8) {
      if (details.deltas[winner] < 0.5) {
        trend_text = 'a lot worse here than';
      } else {
        trend_text = 'worse here than';
      }
    }
    
    return (
      <div className="niq-constituency-details">
        <span className="niq-constituency-details-outcome">
          <span className={winner.toLowerCase()}>
            {winner} {outcome_text}
          </span>
        </span>
        <div className="niq-constituency-insight">
          {PARTY_MAPPINGS[winner]} have won here {wins[winner]} times in {details.years.length} elections since {sorted[sorted.length - 1]} and tend to perform {trend_text} nationally.
        </div>
      </div>
    );
  }

  renderChart(result) {
    return (
      <div className="niq-chart">
        <div className="niq-chart-header">
          <span className="niq-chart-header-title">Party</span>
          <span className="niq-chart-header-title">Result</span>
        </div>
        <div className="niq-chart-body">
          {Object.keys(result).sort((primary, secondary) => {
            if (result[primary] > result[secondary]) {
              return -1;
            }

            return 1;
          }).map(party => {
            if (result[party] === 0) {
              return null;
            }

            return (
              <div className={`niq-chart-row ${party.toLowerCase()}`}>
                <span className="niq-chart-column">{party}</span>
                <span className="niq-chart-column">{(result[party] * 100).toFixed(1)}%</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  render() {
    const {
      constituency,
      results: {
        constituencies
      },
      onClose
    } = this.props;

    if (!constituency) {
      return null;
    }

    const constituency_results = constituencies[constituency];

    return (
      <div className="niq-constituency">
        <div className="niq-constituency__wrapper">
          <div className="niq-constituency__title">
            {constituency}
            <div className="niq-constituency__close" onClick={onClose}>
              Close
            </div>
          </div>
          <div className="niq-constituency__content">
            <div className="niq-constituency__section">
              <div className="niq-constituency__section-title">
                Insights
              </div>
              <div className="niq-constituency__section-content">
                {this.renderDetails()}
              </div>
            </div>
            <div className="niq-constituency__section">
              <div className="niq-constituency__section-title">
                2019 Projection
              </div>
              <div className="niq-constituency__section-content">
                {this.renderChart(constituency_results.result)}
              </div>
            </div>
            <div className="niq-constituency__section">
              <div className="niq-constituency__section-title">
                Historic Results
              </div>
              <div className="niq-constituency__section-content">
                {constituency_results.details.years.sort((primary, secondary) => {
                  if (primary > secondary) {
                    return -1;
                  }

                  return 1;
                }).map(year => {
                  const outcome = {};
                  Object.keys(constituency_results.details.constituency).forEach(party => {
                    if (constituency_results.details.constituency[party][year]) {
                      outcome[party] = constituency_results.details.constituency[party][year];
                    }
                  });

                  return (
                    <div className="niq-constituency__history">
                      <div className="niq-constituency__history-title">
                        {year}
                      </div>
                      <div className="niq-constituency__history-chart">
                        {this.renderChart(outcome)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ConstituencyDetails;
