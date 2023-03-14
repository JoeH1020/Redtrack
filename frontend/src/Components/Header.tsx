import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default function Header() {
  return (
    <div>
      <Navbar bg="danger" expand="lg">
        <Container>
          <Navbar.Brand className="text-white fs-1 text" href="#home">RED Technologies</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link className="text-white fs-5 text justify-content-center" href="#home">Sign Out</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}
