import { Col, Container, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function MainDashboard(props: any) {
    return (
        <Container className="max-width">
            <Row className="justify-content-md-center">
                <Stack gap={4}>
                    <div>
                        <h2>Personal</h2>
                        <Row>
                            <Col xs>
                                <Link to="/personalinfo" className="btn btn-light border px-3 py-4 w-100 h-100">
                                    <img src="PersonalInfo.png" alt="" className="w-50 mx-auto d-block mb-2" />
                                    <b>Personal Info</b>
                                </Link>
                            </Col>
                            <Col xs>
                                <Link to="/userprofile" className="btn btn-light border px-3 py-4 w-100 h-100">
                                    <img src="LoginDetails.png" alt="" className="w-50 mx-auto d-block mb-2" />
                                    <b>Login Details</b>
                                </Link>
                            </Col>
                        </Row>
                    </div>

                    <div> 
                        <h2>Medical</h2>
                        <Row>
                            <Col xs>
                                <Link to="/medicalprofile" className="btn btn-light border px-3 py-4 w-100 h-100">
                                    <img src="MedicalProfile.png" alt="" className="w-50 mx-auto d-block mb-2" />
                                    <b>Medical Profile</b>
                                </Link>
                            </Col>
                            <Col xs>
                                <Link to="/medicareinfo" className="btn btn-light border px-3 py-4 w-100 h-100">
                                    <img src="MedicareInfo.png" alt="" className="mx-auto d-block my-2" />
                                    <b>Medical Info</b>
                                </Link>
                            </Col>
                        </Row>
                    </div>

                    <div>
                        <h2>Data and Permissions</h2>
                        <Row>
                            <Col xs>
                                <Link to="/" className="btn btn-light border px-3 py-4 w-100 h-100">
                                    <img src="DataMatrix.png" alt="" className="w-50 mx-auto d-block mb-2" />
                                    <b>Data Matrix</b>
                                </Link>
                            </Col>
                            <Col xs>
                                <Link to="/" className="btn btn-light border px-3 py-4 w-100 h-100">
                                    <img src="PrivacyPolicy.png" alt="" className="w-50 mx-auto d-block mb-2" />
                                    <b>Privacy Policy</b>
                                </Link>
                            </Col>
                        </Row>
                    </div>
                </Stack>
            </Row>
        </Container>
    )

}