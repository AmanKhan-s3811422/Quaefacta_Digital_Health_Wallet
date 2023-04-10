import { Col, Row, Stack } from "react-bootstrap";

import FormSignUp from "../Forms/FormSignUp";

export default function SignUp(props: any) {
    return (
        <Row className="justify-content-md-center">
            <Stack gap={4} className="QF-Home-div">
                <img src="/logo512.png" alt="Quaefacta logo" className="QF-Icon-Big" />
                <h2>Register an account</h2>
                <br/>
            </Stack>
            <Col md="6">
                <FormSignUp />
            </Col>
        </Row>
    );
}