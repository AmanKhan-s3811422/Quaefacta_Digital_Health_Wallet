import { useState } from "react";
import { Button, Col, Container, Form, Row, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { fileUpload } from "../Context/UploadActions";
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';


export default function DocumentUpload(props: any) {
    const navigate = useNavigate();
    const [cameraPressed, setCameraPressed] = useState(false)

    
    interface FieldsData {
        file: any;
        fileType: string;
    }
    
    const [fields, setFields] = useState<FieldsData>(() => {
        return {
            file: "",
            fileType: "",
        }
    });

    let valid = {
        file: false,
        fileType: false,
    }

    const [errors, setErrors] = useState<Partial<FieldsData>>({
    });

    // Setting multiple errors
    function updateErrors(newErrors: { [key in keyof Partial<FieldsData>]: string }) {
        setErrors((errors) => ({ ...errors, ...newErrors }))
    }

    // Setting one error
    function setAnError(key: keyof FieldsData, value: string) {
        updateErrors({ [key]: value });
    }

    const handleInputChange = (event: any) => {

        if (event.target.files === undefined || event.target.files === null) {
            // use spread operator to copy fields
            const temp = { ...fields };

            // Update field and state.
            temp[event.target.name as keyof typeof temp] = event.target.value;
            setFields(temp);
        } else {
            // use spread operator to copy fields
            const temp = { ...fields };

            temp.file = event.target.files[0]
            setFields(temp);
        }
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();

        // file
        if (!fields.file) {
            setAnError("file", "File is required")
            valid.file = false;
        } else {
            setAnError("file", "");
            valid.file = true;
        }

        // fileType
        if (!fields.fileType) {
            setAnError("fileType", "File type is required");
            valid.fileType = false;
        } else {
            setAnError("fileType", "");
            valid.fileType = true;
        }

        const fileData = {
            file: fields.file,
            fileType: fields.fileType
        }

        if (!Object.values(valid).includes(false)) {
            const user =window.localStorage.getItem("currentUser")
            console.log(user)
            if (user !== null) {
                fileUpload(fileData.file, fileData.fileType, JSON.parse(user).id).then(response => {
                    alert('Successfully uploaded document')
                
                    navigate('/')
                }).catch(error => {
                    alert("Error uploading file!")
                })
           }
        }
    }

    function handleTakePhoto (dataUri: any) {
        // Add photo handling logic here
        // Upload photo to s3 bucket
        setCameraPressed(false);
    }


    function handleCameraButton () {
        setCameraPressed(true);
    }


    return (
        <>
 
        {
            !cameraPressed ? <>
            <Row className="justify-content-md-center">
                <Col md="6">
                    <div className="d-flex justify-content-between g-4 py-5">
                    
                        <Form.Group controlId="formFile" className="btn text-center">
                            <Form.Control type="file" className="d-none" name="file" onChange={handleInputChange} />
                                <Form.Label className="">
                                    <img src="doc.png" alt="" className="mx-auto d-block mb-2" width="60" />
                                </Form.Label>
                            <br/>
                            <label className="">Document</label>
                        </Form.Group>
                        <Form.Group controlId="formCamera" className="btn text-center">
                            <button className="document-upload-button-group" onClick={handleCameraButton}>
                                <img src="camera.png" alt="" className="mx-auto d-block mb-2" width="60" />
                            </button>
                            <br/>
                            <label className="">Camera</label>
                        </Form.Group>
                        <Form.Group controlId="formGallery" className="btn text-center">
                            <Form.Control type="file" className="d-none" name="file" onChange={handleInputChange} />
                                <Form.Label className="">
                                    <img src="gallery.png" alt="" className="mx-auto d-block mb-2" width="60" />
                                </Form.Label>
                                <br/>
                            <label className="">Gallery</label>
                        </Form.Group>
                    </div>

                    <Container >
                        <h4>Reports and Monitoring</h4>
                        <Form onSubmit={handleSubmit} noValidate>
                            <Stack>
                            <Form.Group className="mb-3">
                                    <Form.Select aria-label="Conditions/Diseases" name="fileType" onChange={handleInputChange}>
                                        <option>Conditions/Diseases</option>
                                        <option value="Adverse Drug Reactions">Adverse Drug Reactions</option>
                                        <option value="Allergies">Allergies</option>
                                        <option value="Arthritis">Arthritis</option>
                                        <option value="Atrial Fibrillation">Atrial Fibrillation</option>
                                        <option value="Blood Pressure">Blood Pressure</option>
                                        <option value="COVID-19">COVID-19</option>
                                        <option value="Dental ">Dental </option>
                                        <option value="Dermatology">Dermatology</option>
                                        <option value="Diabetes">Diabetes</option>
                                        <option value="Glucose Monitoring ">Glucose Monitoring </option>
                                        <option value="General Practitioner ">General Practitioner </option>
                                        <option value="Heart Disease">Heart Disease</option>
                                        <option value="Heart Rate">Heart Rate</option>
                                        <option value="Hospital Admission Report ">Hospital Admission Report </option>
                                        <option value="Hospital Discharge Report">Hospital Discharge Report</option>
                                        <option value="Health Clinic">Health Clinic</option>
                                        <option value="Laboratory Report ">Laboratory Report </option>
                                        <option value="Medical Report">Medical Report</option>
                                        <option value="Medications/Vitamins">Medications/Vitamins</option>
                                        <option value="Mental Health Plan ">Mental Health Plan </option>
                                        <option value="Pathology ">Pathology </option>
                                        <option value="Pregnancy ">Pregnancy </option>
                                        <option value="Prescriptions">Prescriptions</option>
                                        <option value="Oncology">Oncology</option>
                                        <option value="Radiology/Xray">Radiology/Xray</option>
                                        <option value="Sleep apnoea">Sleep apnoea</option>
                                        <option value="Skin Conditions">Skin Conditions</option>
                                        <option value="Treatments">Treatments</option>
                                        <option value="Vaccinations">Vaccinations</option>
                                        <option value="Wellness Plan">Wellness Plan</option>
                                        <option value="Other">Other</option>


                                        


                                    </Form.Select>
                                    <Form.Text className="text-danger"> {errors.fileType}</Form.Text>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Select aria-label="Document Type" name="fileType" onChange={handleInputChange}>
                                        <option>Document Type</option>
                                        <option value="Arthritis Report">Arthritis Report</option>
                                        <option value="Atrial Fibrillation ECG">Atrial Fibrillation ECG</option>
                                        <option value="Blood Pressure/Heart Rate Report">Blood Pressure/Heart Rate Report</option>
                                        <option value="COVID-19 Record">COVID-19 Record</option>
                                        <option value="Dental Report Xray">Dental Report Xray</option>
                                        <option value="Dermatology Report">Dermatology Report</option>
                                        <option value="Glucose Monitoring">Glucose Monitoring</option>
                                        <option value="General Practitioner Report">General Practitioner Report</option>
                                        <option value="Heart Disease Report">Heart Disease Report</option>
                                        <option value="Hospital Admission Report ">Hospital Admission Report </option>
                                        <option value="Hospital Discharge Report ">Hospital Discharge Report </option>
                                        <option value="Health Clinic Report">Health Clinic Report</option>
                                        <option value="Laboratory Report">Laboratory Report</option>
                                        <option value="Medical Record">Medical Record</option>
                                        <option value="Medications/Vitamins">Medications/Vitamins</option>
                                        <option value="Mental Health Plan">Mental Health Plan</option>
                                        <option value="Pathology Report">Pathology Report</option>
                                        <option value="Pregnancy Record">Pregnancy Record</option>
                                        <option value="Prescriptions">Prescriptions</option>
                                        <option value="Oncology Record ">Oncology Record </option>
                                        <option value="Radiology/Xray Report">Radiology/Xray Report</option>
                                        <option value="Skin Conditions ">Skin Conditions </option>
                                        <option value="Treatments">Treatments</option>
                                        <option value="Vaccination Record">Vaccination Record</option>
                                        <option value="Wellness Plan">Wellness Plan</option>
                                        <option value="Other">Other</option>


                                    </Form.Select>
                                    <Form.Text className="text-danger"> {errors.fileType}</Form.Text>   
                                </Form.Group>
                                

                                

                                <Form.Group className="w-100 mb-3">
                                    <Form.Control as="textarea" rows={3} placeholder="Describe duration of symptioms, notes
                                    side effects, comments" id="desc" name="desc" onChange={handleInputChange} />
                                    {/* <Form.Text className="text-danger d-block text-start"> {errors.desc}</Form.Text> */}
                                </Form.Group>

                                <Button variant="primary" type="submit" className='QF-Primary-Button d-block'>Submit</Button>
                            </Stack>
                        </Form>
                    </Container>
                </Col>
            </Row>
            </> :
            <>
                <Camera
                    onTakePhoto = { (dataUri) => { handleTakePhoto(dataUri); } }
                />
            </>

        }
        </>
    )
}