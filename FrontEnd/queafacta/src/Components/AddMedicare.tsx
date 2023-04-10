import { useState } from "react";
import { Button, Col, Container, Form, Row, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { fileUpload } from "../Context/UploadActions";
import { ExclamationCircle } from "react-bootstrap-icons";
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';


export default function AddMedicare(props: any) {
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

        console.log("-----------------------")
        console.log(fileData)
        console.log(valid)

        if (!Object.values(valid).includes(false)) {
            const user =window.localStorage.getItem("currentUser")
            console.log(user)
            if (user !== null) {
                fileUpload(fileData.file, 'medicare', JSON.parse(user).id).then(response => {
                    alert('Successfully uploaded document')
                    navigate('/medicareinfo')
                }).catch(error => {
                    alert("Error uploading file!")
                })
           }
        }
        navigate('/medicareinfo')
        
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
            <h3 className="text-center py-4">Tap to fill out</h3>
            <Row className="justify-content-md-center">
                <Col md="6">
                    <Container >
                        <Form onSubmit={handleSubmit} noValidate>
                            <Stack gap={4}>
                                <div className="medicare-pane rounded-3 border border-info p-2">
                                    <div className="d-flex justify-content-between">
                                        <div>
                                            <button className="btn" onClick={handleCameraButton}><img src="CameraScan.png" alt="" /></button>
                                        </div>
                                        <div>
                                            <img src="Med.png" alt="" />
                                        </div>
                                    </div>
                                    <div className="row g-0 my-2">
                                        <div className="col-2"></div>
                                        <Form.Group className="col-8">
                                            <Form.Control type="text" placeholder="Card Number" />
                                        </Form.Group>
                                    </div>
                                    <div className="row g-0 my-2">
                                        <Form.Group className="col-2">
                                            <Form.Control type="text" placeholder="REF#" />
                                        </Form.Group>
                                        <Form.Group className="col-8">
                                            <Form.Control type="text" placeholder="Name on card" />
                                        </Form.Group>
                                    </div>
                                    <div className="d-flex justify-content-end">
                                        <Form.Group className="col-6 d-flex">
                                            <Form.Label className="w-100">VALID TO</Form.Label>
                                            <Form.Control type="text" placeholder="01/2000" />
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className="w-100 text-center">or</div>
                                <Form.Group controlId="formFile" className="upload-file px-4">
                                    <Form.Label className="btn mx-auto upload-btn">Add Document</Form.Label>
                                    <p className="text-center">{fields.file.name}</p>
                                    <Form.Control type="file" className="d-none" name="file" onChange={handleInputChange} />
                                    <Form.Text className="text-danger"> {errors.file}</Form.Text>
                                </Form.Group>
                                <div><ExclamationCircle size={14} /> All information entered is kept secure in accordance with our <Link to="">privacy policy</Link></div>
                                <Button variant="primary" type="submit" className='QF-Primary-Button d-block'>Submit</Button>
                            </Stack>
                        </Form>
                    </Container>
                </Col>
            </Row>
            </> :
            <>
                <h3 className="text-center py-4">Scan your medicare card</h3>
                <Camera
                    onTakePhoto = { (dataUri) => { handleTakePhoto(dataUri); } }
                />
            </>

        }
        </>
    )
}