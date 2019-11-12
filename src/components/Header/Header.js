import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
  render() {
    return (
      <div className="niq-header-container">
        <span className="niq-header-title-primary">NIQOLO</span>
        <span className="niq-header-title-secondary">Election 2019</span>
      </div>
    );
  }
}

export default Header;
