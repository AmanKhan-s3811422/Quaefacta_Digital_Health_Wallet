import { useState, useEffect } from 'react';
import { useContext } from "react";
import { CurrentUserContext } from "../Context/UserContext";
import { Link } from "react-router-dom";
import { Card, Container, Row, Stack } from "react-bootstrap";
import { getUserInformation } from "../Context/UserActions";
import Button from 'react-bootstrap/Button';

// Renders the user profile page with user data
function UserProfile(props: any) {
    const { user } = useContext(CurrentUserContext);
    const [userInformation, setUserInformation] = useState<any>(null);

    useEffect(() => {
        loadUserInformation()
        // eslint-disable-next-line
        }, [])

    async function loadUserInformation() {
        const user = localStorage.getItem("currentUser")
            if (user !== null) {
                setUserInformation(await getUserInformation(JSON.parse(user).id))
            }
    }

    return (
        <>
            <h1>My Profile</h1>
            <p>Please note, this is a development page, where we can test out ideas and arrangements. It should be removed before deployment.</p>
            <hr />
            <Container >
                <h2>Account Details</h2>
                <p>Account Email: {user?.username}</p>
                <Stack gap={2} direction="horizontal">
                    <Button className="QF-Standard-Button" >Update Email</Button>
                    <Button className="QF-Standard-Button">Change Password</Button>
                    <Button variant="danger" className="QF-Standard-Button">Delete Account</Button>
                </Stack>
            </Container>
            <hr />
            <Container >
                <h2>Data and Permissions</h2>
                <Stack gap={2}>
                    <Button variant="secondary">Data Matrix</Button>
                    <Button variant="info">Privacy Policy</Button>
                </Stack>
            </Container>
            <hr />
            <Container>
                <h2>Personal Information</h2>
                <p>First Name: {userInformation !== null && userInformation.firstName !== null ? userInformation.firstName : 'None'} </p>
                <p>Last Name: {userInformation !== null && userInformation.lastName !== null ? userInformation.lastName : 'None'} </p>
                <p>Gender: {userInformation !== null && userInformation.gender !== null ? userInformation.gender : 'None'} </p>
                <p>D.O.B: {userInformation !== null && userInformation.dob !== null ? userInformation.dob : 'None'} </p>
                <p>Street Address 1: {userInformation !== null && userInformation.address1 !== null ? userInformation.address1 : 'None'} </p>
                <p>Street Address 2: {userInformation !== null && userInformation.address2 !== null && userInformation.address2 !== "" ? userInformation.address2 : 'None'} </p>
                <p>Postcode: {userInformation !== null && userInformation.postCode !== null ? userInformation.postCode : 'None'} </p>
                <p>Country: {userInformation !== null && userInformation.country !== null ? userInformation.country : 'None'} </p>
                <p>State: {userInformation !== null && userInformation.state !== null ? userInformation.state : 'None'} </p>
                <p>Mobile Number: {userInformation !== null && userInformation.phone !== null ? userInformation.phone : 'None'} </p>
                <p>Contact Email: {userInformation !== null && userInformation.email !== null ? userInformation.email : 'None'} </p>
                <Stack gap={2} direction="horizontal">
                    <Link to="/personalinfo" className="btn btn-primary">Update Information</Link>
                    <Button variant="warning">Clear Information</Button>
                </Stack>
            </Container>
            <hr />
            <Container>
                <h2>Emergency Contact(s)</h2>
                <Row md={3}>
                <Card>
                    <p>Name</p>
                    <p>Mobile Number</p>
                    <p>Relation</p>
                    <Stack gap={2} direction="horizontal">
                        <Button >Update Information</Button>
                        <Button variant="warning">Delete Contact</Button>
                    </Stack>
                </Card>
                <Card>
                    <p>Name</p>
                    <p>Mobile Number</p>
                    <p>Relation</p>
                    <Stack gap={2} direction="horizontal">
                        <Button >Update Information</Button>
                        <Button variant="warning">Delete Contact</Button>
                    </Stack>
                </Card>
                <Card>
                    <p>Name</p>
                    <p>Mobile Number</p>
                    <p>Relation</p>
                    <Stack gap={2} direction="horizontal">
                        <Button >Update Information</Button>
                        <Button variant="warning">Delete Contact</Button>
                    </Stack>
                </Card>
                </Row>

                <br /><br />
                <Stack gap={2} direction="horizontal">
                    <Button >Add new contact</Button>
                    <Button variant="warning">Delete All</Button>
                </Stack>

            </Container>
            <hr />
            <Container>
                <h2>Other Data</h2>
                <p>
                    DEV NOTE: information which is of a discrete area that
                    should be kept together. This would also allow for internal
                    "firewalling". These buttons will navigate to a new page.
                </p>
                <Stack gap={2}>
                    <Link to="/medicalprofile" className="btn btn-secondary">Medical Profile</Link>
                    <Button variant="secondary">Medicare Info</Button>
                    <Button variant="secondary">Vaccinations</Button>
                </Stack>
            </Container>
        </>

    );
}

export default UserProfile;