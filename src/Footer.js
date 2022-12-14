import React from 'react';
import Navbar from 'react-bootstrap/Navbar';

class Footer extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand> Created by : Ashwini Uppal</Navbar.Brand>
      </Navbar>
    )
  }
}

export default Footer;
