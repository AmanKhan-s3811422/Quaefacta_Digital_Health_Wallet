
import OffCanvasNavMenu from "./OffCanvasNavMenu";

import { Button, Navbar } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import { ArrowLeftSquare } from "react-bootstrap-icons";
import { useLocation, useNavigate } from "react-router-dom";


//* Re-engineering this, as there is really no point in keeping a light header
//* with all functionality in the navbar. We don't plan on having a second 
//* navbar.
export default function Header(props: any) {
  const navigate = useNavigate();

  // This whole section is kind of silly, but it does work and is simple to understand.
  // The title show in the header will change depending on the current pathname.
  // An idea would be to setup some constants for the pathnames and have theese
  // be used here and in App.tsx for the routes for consistency.
  let location = useLocation();
  let displaytitle = "";
  if (location.pathname === "/") {
    displaytitle = "Queafacta"
  }
  else if (location.pathname === "/signup") {
    displaytitle = "Register"
  }
  else if (location.pathname === "/signin") {
    displaytitle = "Sign In"
  }
  else if (location.pathname === "/maindashboard") {
    displaytitle = "Dashboard"
  }
  else if (location.pathname === "/documentupload") {
    displaytitle = "Document Upload"
  }
  else if (location.pathname === "/documents") {
    displaytitle = "Documents"
  }
  else if (location.pathname === "/personalinfo") {
    displaytitle = "Personal Information"
  }
  else if (location.pathname === "/updatemedicalprofile") {
    displaytitle = "Medical Profile"
  }
  else {
    displaytitle = "Queafacta"
  }

  // This is just a neat way of handling how the header's appearance depending on the location.
  var content: any;
  if (location.pathname === "/") {
    content = (
      <Container className="header-container justify-content-center">
        <Navbar.Brand className="header-brand">
          {displaytitle}
        </Navbar.Brand>
      </Container>
    )
  }
  else {
    content = (
      <Container className="header-container">
        {/* <LinkContainer to="/"> */}
          <Button className="btn btn-light" onClick={() => navigate(-1)}>
            <ArrowLeftSquare size={31} />
          </Button>
        {/* </LinkContainer> */}

        <Navbar.Brand className="header-brand">
          {displaytitle}
        </Navbar.Brand>

        <OffCanvasNavMenu />
      </Container>
    )
  }

  return (
    <Navbar collapseOnSelect expand="sm" variant="dark" bg="green" fixed="top" className="header-navbar">
      {content}
    </Navbar>
  );
}
