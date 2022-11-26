import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useSelector } from "react-redux";
const Navber = () => {
  const navigate = useNavigate()
  const cart = useSelector((state) => state.cart.cart);
  return (
    <div className="bg-light "  sticky="top">
      <Navbar className="px-5 sm:px-2"  expand="lg">
      <Container fluid>
        {/* <Navbar.Brand href="#">Home</Navbar.Brand> */}
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            
           
          >
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#action1">Courses</Nav.Link>
            <Nav.Link href="#action2">Contact</Nav.Link>
            <Nav.Link href="#action2">Privacy Policy</Nav.Link>
            <Nav.Link href="#action2">Terms and Condation</Nav.Link>
            
          </Nav>
          <div className="d-flex gap-3">
            
            <span onClick={()=>navigate("/myCart")} className="myCart"><AiOutlineShoppingCart/></span>
            <span className="cartlength">{cart?.length}</span>
            <Button onClick={()=> navigate("/singUp")} variant="outline-success">Sing Up</Button>
            <Button onClick={()=> navigate("/login")}  variant="outline-success">Login</Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  );
};

export default Navber;