import React, { createRef, Component } from 'react';

import * as d3 from 'd3';
import { isEqual } from 'lodash';
import { renderHexJSON } from 'd3-hexjson';

import ConstituencyDetails from './../../containers/ElectoralResults/ConstituencyDetails';
import Table from './../Table';
import ConstituencyJSON from './data/constituencies.json';

import './styles/ConstituencyMap.css';

class ConstituencyMap extends Component {
  state = {
    constituency: null,
    coords: null,
    selected: null
  };

  constructor(props) {
    super(props);

    this.ref = createRef();
    this.onSelectConstituency = this.onSelectConstituency.bind(this);
  }

  componentDidMount() {
    this.chart();
  }
  
  componentDidUpdate(prevProps) {
    const shouldUpdate = (
      !isEqual(prevProps.results, this.props.results) ||
      this.props.region !== prevProps.region
    );

    if (shouldUpdate) {
      this.chart();
    }
  }

  onSelectConstituency(hex) {
    let constituency = null;
    if (hex && this.props.results.constituencies[hex.n]) {
      constituency = hex.n;
    }

    this.setState({
      constituency
    });
  }

  initial() {
    const {
      results
    } = this.props;

    const margin = {top: 10, right: 10, bottom: 10, left: 10};
		const width = 500 - margin.left - margin.right;
    const height = 420 - margin.top - margin.bottom;

    this.svg = d3
      .select(this.ref.current)
      .attr("width", 350)
		  .attr("height", height + margin.top + margin.bottom)
		  .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      
    this.hexes = renderHexJSON(ConstituencyJSON, width, height);

    this.hexmap = this.svg
      .selectAll("g")
      .data(this.hexes)
      .enter()
      .append("g")
      .attr("transform", function(hex) {
        return "translate(" + hex.x + "," + hex.y + ")";
      });

    var me = this;

    this.hexmap
      .append("polygon")
      .on('click', this.onSelectConstituency)
      .on('mouseover', function(hex) {
        me.setState({
          coords: this.getBoundingClientRect(),
          selected: results.constituencies[hex.n]
        });
      })
      .on('mouseout', () => this.setState({ selected: null, coords: null }))
      .attr("points", function(hex) {return hex.points;})
      .attr('class', (hex) => {
        if (results.constituencies[hex.n]) {
          return results.constituencies[hex.n].winner.toLowerCase() + '-svg';
        }
        
        return '';
      })
      .attr("fill", (hex) => {
        if (!results.constituencies[hex.n]) {
          return "#DDD";
        }
        
        return '';
      });
  }

  chart() {
    if (!this.svg) {
      this.initial();
    }

    const {
      region,
      results
    } = this.props;

    this.hexmap
      .selectAll('polygon')
      .classed('niq-map__constituency', true)
      .classed('niq-map__constituency--faded', (hex) => {
        if (region) {
          const constituency = results.constituencies[hex.n];
          if (constituency && constituency.region === region) {
            return false;
          }

          return true;
        }

        return false;
      });
    
  }

  render() {
    const {
      coords,
      selected
    } = this.state;

    const headers = [
      { label: 'Party' },
      { label: 'Projection' }
    ];

    let rows = selected && Object.keys(selected.result).map(key => ({
      columns: [
        { className: key.toLowerCase(), value: key },
        { className: key.toLowerCase(), value: <b>{`${(parseFloat(selected.result[key], 10) * 100).toFixed(0)}%`}</b> }
      ]
    }));

    return (
      <div className="niq-map__container">
        <svg ref={this.ref} width={200} height={400} />
        {selected && (
          <div className="niq-map__overlay" style={{ top: coords.top, left: coords.left }}>
            <div className="niq-map__title">
              {selected.details.name}
            </div>
            <div className="niq-map__table">
              <Table headers={headers} rows={rows} />
            </div>
          </div>
        )}
        <ConstituencyDetails
          constituency={this.state.constituency}
          onClose={this.onSelectConstituency}
          results={this.props.results}
        />
      </div>
    )
  }
}

export default ConstituencyMap;