import { Link } from "react-router-dom";
import { Dropdown, DropdownButton, Stack } from "react-bootstrap";

// Renders the home
export default function Home(props: any) {
    return (
        <>
            <div className="QF-Home-div">
                <Stack gap={4} className="QF-Home-div">
                    <img src="/logo512.png" alt="Quaefacta logo" className="QF-Icon-Big" />
                    <h2>Welcome to Quaefacta Health</h2>
                </Stack>
                <br />
                <p>Please select your country and language.</p>

                {/* 
                 //* https://react-bootstrap.netlify.app/components/dropdowns/#single-button-dropdowns 
                 //TODO Make this update the value in the button to reflect the current choice
                 //! Currently doesn't do anything
                */}

                <Stack gap={4}>
                    <DropdownButton id="dropdown-basic-button" title="Country" variant="light" className="QF-Matching-Dropdown">
                        <Dropdown.Item>Australia</Dropdown.Item>
                        <Dropdown.Item disabled>Ethiopia</Dropdown.Item>
                    </DropdownButton>

                    <DropdownButton id="dropdown-basic-button" title="Languages" variant="light" className="QF-Matching-Dropdown">
                        <Dropdown.Item>English</Dropdown.Item>
                        <Dropdown.Item disabled>Ethiopian</Dropdown.Item>
                    </DropdownButton>

                    <Link className="btn btn-primary QF-Primary-Button" to="/newhere">Continue</Link>
                </Stack>
            </div>
        </>
    );
}