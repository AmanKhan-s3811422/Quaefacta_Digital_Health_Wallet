import { Button, Container, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";

// This page is a placeholder and needs to be updated into being a "disabled" version of the 
export default function MedicalProfile(props: any) {
    return (
        <div>
            <Container>
                <h2>Medical Profile</h2>
                <p>Blood Type: None </p>
                <p>Height (cm): None </p>
                <p>Weight (kg): None </p>
                <p>Age: None </p>
                <p>Aboriginal/Torres Strait Islander: None </p>
                <p>Pregnant: None </p>
                <p>Allergies: None </p>
                <p>Conditions: None </p>
                <p>Name: None </p>
                <p>Phone: None </p>
                <p>Relation: None </p>
                <Stack gap={2} direction="horizontal">
                    <Link to="/updatemedicalprofile" className="btn btn-primary">Update Information </Link>
                    <Button variant="warning">Clear Information</Button>
                </Stack>
            </Container>
        </div>
    );
}