import { Button, Container, Form, Row, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRightCircleFill } from "react-bootstrap-icons";
import { useState } from "react";

export default function SignUpProcess(props: any) {

    const [medicareProfileColour, setMedicareProfileColour] = useState("medicare-profile-button-white");
    const [medicareDetailColour, setMedicareDetailColour] = useState("medicare-detail-button-white");

    const navigate = useNavigate();


    const handleSubmit = (e: any) => {
      e.preventDefault();
      if (medicareProfileColour === "medicare-profile-button-green") {
        navigate("/medicalprofile")
        
      }
      if (medicareDetailColour === "medicare-detail-button-green") {
        navigate("/addmedicare")
      }
    }

    function medicareProfileClicked() {
      setMedicareProfileColour("medicare-profile-button-green")
      setMedicareDetailColour("medicare-detail-button-red")
    }

    function medicareDetailClicked() {
      setMedicareProfileColour("medicare-profile-button-red")
      setMedicareDetailColour("medicare-detail-button-green")
    }


    return (
        <Container className="max-width">
          <Form onSubmit={handleSubmit} noValidate>
            <Row className="">
                <Stack gap={2}>
                    <div>
                      <img src="Checklist.png" alt="" className="w-25 mx-auto d-block" />
                      <p>We just need a few details to get started! It only takes a few minutes to complete your profile.</p>
                    </div>

                    <p className="text-center">Required</p>

                    <div>
                      <Form.Check reverse className={`${medicareProfileColour} rounded-3 text-black ps-3 pe-5 py-3 w-100`} style={{ textAlign: "left" }} onClick={medicareProfileClicked}
                          type='radio'
                          name="radio"
                          label={
                            <>
                              <h5 className="button-heading">Complete Medical Profile*</h5>
                              <p className="mb-0">Add relevant details to help us optimise your care</p>
                            </>
                          }
                      />
                    </div>

                    <div>
                      <Form.Check reverse className={`${medicareDetailColour} rounded-3 text-black ps-3 pe-5 py-3 w-100`} style={{ textAlign: "left" }} onClick={medicareDetailClicked}
                          type='radio'
                          name="radio"
                          label={
                            <>
                              <h5 className="button-heading">Add Medicare Details*</h5>
                              <p className="mb-0">Help us to connect and streamline your experience</p>
                            </>
                          }
                      />
                    </div>

                    <p className="text-center">Can be done later</p>

                    <div>
                      <Link to="" className="medicare-profile-button-white border border-secondary d-block btn rounded-3 text-black ps-3 pe-5 py-3 w-100 text-start position-relative">
                          <h5 className="button-heading">Add Healthcare Provider Details</h5>
                          <p className="mb-0">Add details for your regular Clinics, Practitioners, or Pharmacies</p>
                          <ArrowRightCircleFill className="abs-right text-muted" size={18} />
                      </Link>
                    </div>

                    <div>
                      <Link to="" className="medicare-profile-button-white border border-secondary d-block btn rounded-3 text-black ps-3 pe-5 py-3 w-100 text-start position-relative">
                          <h5 className="button-heading">Add medications</h5>
                          <p className="mb-0">Add details of the medications you are currently taking</p>
                          <ArrowRightCircleFill className="abs-right text-muted" size={18} />
                      </Link>
                    </div>

                    <div>
                      <Link to="" className="medicare-profile-button-white border border-secondary d-block btn rounded-3 text-black ps-3 pe-5 py-3 w-100 text-start position-relative">
                          <h5 className="button-heading">Add vaccinations</h5>
                          <p className="mb-0">Add your vaccination history</p>
                          <ArrowRightCircleFill className="abs-right text-muted" size={18} />
                      </Link>
                    </div>

                    <Button variant="primary" type="submit" className='QF-Primary-Button'>Proceed</Button>

                </Stack>
            </Row>
          </Form>
        </Container>
    )

}