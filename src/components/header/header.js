import React from 'react';
import './header.css';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static propTypes = {};

  componentDidMount() {}

  render() {
    return (
      <div className="header">
        <div className="logo">
          <img src="icon.svg" alt="icon"></img>
        </div>
      </div>
    );
  }
}

export default Header;
