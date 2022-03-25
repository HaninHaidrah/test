import React from "react";
import { Navbar, Nav,Container } from "react-bootstrap";

const Header = () => {
  return (

<Navbar bg="light" variant="light">
    <Container>
    <Nav className="me-auto">
      <Nav.Link href="/">Home</Nav.Link>
      <Nav.Link href="/sector">Sector</Nav.Link>
      <Nav.Link href="/profile">Profile</Nav.Link>
    </Nav>
    </Container>
  </Navbar>
  );
};

export default Header;
