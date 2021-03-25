import React, { Component } from 'react';
import DectubeLogo from './assets/dectube.png'

class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow text-monospace">
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          href="http://www.dectube.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={DectubeLogo} width="30" height="30" className="d-inline-block align-top" alt="" />
          &nbsp;DecTube
        </a>
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <small className="text-secondary">
              <small id="account" className='text-white'>Account: {this.props.account}</small>
            </small>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;

