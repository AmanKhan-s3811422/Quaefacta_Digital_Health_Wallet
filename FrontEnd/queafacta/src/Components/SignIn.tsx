import { Col, Row, Stack } from "react-bootstrap";

import FormSignIn from "../Forms/FormSignIn";

export default function SignIn(props: any) {
    return (
        <Row className="justify-content-md-center">
            <Stack gap={4} className="QF-Home-div">
                <img src="/logo512.png" alt="Quaefacta logo" className="QF-Icon-Big" />
                <h2>Welcome back!</h2>
                <br/>
            </Stack>
            <Col md="6">
                <FormSignIn />
            </Col>
        </Row>
    );
}