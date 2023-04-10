import { Button, Col, Container, Form, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ExclamationCircle } from "react-bootstrap-icons";

// This page is a placeholder at this point, so the as of yet unused items are commented out so that the linter doesn't complain.
export default function AddMedicareInfo(props: any) {
    // const navigate = useNavigate();
    
    // interface FieldsData {
    //     file: any;
    //     fileType: string;
    // }
    
    // const [fields, setFields] = useState<FieldsData>(() => {
    //     return {
    //         file: "",
    //         fileType: "",
    //     }
    // });

    // let valid = {
    //     file: false,
    //     fileType: false,
    // }

    // const [errors, setErrors] = useState<Partial<FieldsData>>({
    // });

    // Setting multiple errors
    // function updateErrors(newErrors: { [key in keyof Partial<FieldsData>]: string }) {
    //     setErrors((errors) => ({ ...errors, ...newErrors }))
    // }

    // Setting one error
    // function setAnError(key: keyof FieldsData, value: string) {
    //     updateErrors({ [key]: value });
    // }

    return (
        <>
            <h3 className="text-center py-4">Medicare Info</h3>
            <Row className="justify-content-md-center">
                <Col md="6">
                    <Container >
                      
                            <Stack gap={4}>
                                <div className="medicare-pane rounded-3 border border-info p-2">
                                    <div className="d-flex justify-content-between">
                                        <div>
                                            <img src="Med.png" alt="" />
                                        </div>
                                    </div>
                                    <div className="row g-0 my-2">
                                        <div className="col-2"></div>
                                        <Form.Group className="col-8">
                                            <Form.Control type="text" value="Card Number" readOnly/>
                                        </Form.Group>
                                    </div>
                                    <div className="row g-0 my-2">
                                        <Form.Group className="col-2">
                                            <Form.Control type="text" value="REF#" readOnly/>
                                        </Form.Group>
                                        <Form.Group className="col-8">
                                            <Form.Control type="text" value="Name on card" readOnly/>
                                        </Form.Group>
                                    </div>
                                    <div className="d-flex justify-content-end">
                                        <Form.Group className="col-6 d-flex">
                                            <Form.Label className="w-100">VALID TO</Form.Label>
                                            <Form.Control type="text" value="01/2000" readOnly/>
                                        </Form.Group>
                                    </div>
                                </div>
                                <div><ExclamationCircle size={14} /> All information entered is kept secure in accordance with our <Link to="">privacy policy</Link></div>
                                <Link to="/addmedicare"><Button variant="primary" className='QF-Primary-Button d-block'>Update Medicare Info</Button></Link>
                            </Stack>
                    </Container>
                </Col>
            </Row>
        </>
    )
}