import React, { useContext, useState } from 'react';
import { Nav } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

import { CurrentUserContext } from "../Context/UserContext";

import { logout } from "../Context/UserActions";

import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { LinkContainer } from 'react-router-bootstrap'
import { List } from "react-bootstrap-icons";

//* https://react-bootstrap.netlify.app/components/offcanvas/#backdrop

export default function OffCanvasNavMenu() {
    // State for the off-canvas
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const toggleShow = () => setShow((s) => !s);

    // State of the app
    const { user, setUser } = useContext(CurrentUserContext);

    let navigate = useNavigate();
    const handleLogout = (e: any) => {
        logout(setUser);
        navigate("/");
    }

    //! Bug: opening the Nav Menu causes a scoll to bottom of a page.
    return (
        <>
            <Button className="btn btn-light" onClick={toggleShow}>
                <List size={28} />
            </Button>
            <Offcanvas show={show} onHide={handleClose} placement={"end"} className="offcanvas-body">

                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>{user ? <>Welcome {user.username}</> : null}</Offcanvas.Title>
                </Offcanvas.Header>

                <Offcanvas.Body>
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                        <LinkContainer to="/" onClick={handleClose}>
                            <Nav.Link>Home</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/signin" onClick={handleClose}>
                            <Nav.Link>Sign In</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/signup" onClick={handleClose}>
                            <Nav.Link>Sign Up</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/maindashboard" onClick={handleClose}>
                            <Nav.Link>Main Dashboard</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/userprofile" onClick={handleClose}>
                            <Nav.Link>Profile</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/documentupload" onClick={handleClose}>
                            <Nav.Link>Document Upload</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/documents" onClick={handleClose}>
                            <Nav.Link>Documents</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/signupprocess" onClick={handleClose}>
                            <Nav.Link>Sign Up Process page</Nav.Link>
                        </LinkContainer>
                        <hr />
                        <Nav onClick={handleLogout}>
                            <Nav.Link>Log out</Nav.Link>
                        </Nav>
                    </Nav>
                </Offcanvas.Body>

            </Offcanvas>
        </>
    )
}