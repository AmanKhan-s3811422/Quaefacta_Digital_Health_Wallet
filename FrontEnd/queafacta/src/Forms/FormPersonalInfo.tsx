import { useState } from "react";
import { Button, ButtonGroup, Form, Stack, } from "react-bootstrap";
import ToggleButton from 'react-bootstrap/ToggleButton';
import { Link, useNavigate } from "react-router-dom";
import { ExclamationCircle } from "react-bootstrap-icons";
import { editUserInformation } from "../Context/UserActions";

//* This form is currently used for both signing up and singing in.
export default function FormPersonalInfo(props: any) {
    const navigate = useNavigate();

    interface FieldsData {
        firstname: string;
        lastname: string;
        gender: string;
        dob: string;
        sa1: string;
        sa2: string;
        postcode: string;
        country: string;
        state: string;
        mobile: string;
        email: string;
    }
    const [gender, setGender] = useState('');

    const gender_list = [
        { name: 'Male', value: 'male' },
        { name: 'Female', value: 'female' },
        { name: 'Non-Binary', value: 'non-binary' },
        { name: 'Choose not to say', value: 'choose-not-to-say' },
    ];

    const [fields, setFields] = useState<FieldsData>(() => {
        return {
            firstname: "",
            lastname: "",
            gender: "",
            dob: "",
            sa1: "",
            sa2: "",
            postcode: "",
            country: "",
            state: "",
            mobile: "",
            email: "",
        }
    });

    let valid = {
        firstname: false,
        lastname: false,
        gender: false,
        dob: false,
        sa1: false,
        // sa2: false,
        postcode: false,
        country: false,
        state: false,
        mobile: false,
        email: false,
    }

    // https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype
    // https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html
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

    const handleInputChange = (event: { target: { name: any; value: any; }; }) => {
        const name: string = event.target.name;
        const value: string = event.target.value;

        // use spread operator to copy fields
        const temp = { ...fields };

        // Update field and state.
        temp[name as keyof typeof temp] = value;
        setFields(temp);
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (!fields.firstname) {
            setAnError("firstname", "First name is required")
            valid.firstname = false;
        } else {
            setAnError("firstname", "");
            valid.firstname = true;
        }

        if (!fields.lastname) {
            setAnError("lastname", "Last name is required")
            valid.lastname = false;
        } else {
            setAnError("lastname", "");
            valid.lastname = true;
        }

        if (!gender) {
            setAnError("gender", "Gender is required")
            valid.gender = false;
        } else {
            setAnError("gender", "");
            valid.gender = true;
        }

        if (!fields.dob) {
            setAnError("dob", "D.O.B is required")
            valid.dob = false;
        } else if ((new Date(fields.dob)).getTime() > (new Date()).getTime()) {
            setAnError("dob", "D.O.B must before today")
            valid.dob = false;
        } else {
            setAnError("dob", "");
            valid.dob = true;
        }

        if (!fields.sa1) {
            setAnError("sa1", "Street address is required")
            valid.sa1 = false;
        } else {
            setAnError("sa1", "");
            valid.sa1 = true;
        }

        if (!fields.postcode) {
            setAnError("postcode", "Postcode is required")
            valid.postcode = false;
        } else {
            setAnError("postcode", "");
            valid.postcode = true;
        }

        if (!fields.country) {
            setAnError("country", "Country is required")
            valid.country = false;
        } else {
            setAnError("country", "");
            valid.country = true;
        }

        if (!fields.state) {
            setAnError("state", "State is required")
            valid.state = false;
        } else {
            setAnError("state", "");
            valid.state = true;
        }

        if (!fields.mobile) {
            setAnError("mobile", "Mobile is required")
            valid.mobile = false;
        } else {
            setAnError("mobile", "");
            valid.mobile = true;
        }

        if (!fields.email) {
            setAnError("email", "Email is required")
            valid.email = false;
        } else {
            setAnError("email", "");
            valid.email = true;
        }

        const personalDetails = fields;
        personalDetails.gender = gender;


        if (!Object.values(valid).includes(false)) {
            const user = localStorage.getItem("currentUser")
            if (user !== null) {
                editUserInformation(personalDetails, JSON.parse(user).id)
                alert("Successfully updated personal information.")
                navigate("/userprofile");
            }
        }
    }

    // const formatDate = (e: any) => {
    //     const date = new Date();
    //     const y = date.getFullYear();
    //     const m = date.getMonth() + 1;
    //     const d = date.getDate();
    //     return y+'-'+m+'-'+d;
    // }

    return (
        <Form onSubmit={handleSubmit} noValidate className="QF-Form-Centered-Narrow max-width">
            <Stack gap={3} className="QF-Home-div">
                <Form.Group className="w-100">
                    <Form.Control type="text" placeholder="First Name" value={fields.firstname} id="firstname" name="firstname" onChange={handleInputChange} />
                    <Form.Text className="text-danger d-block text-start"> {errors.firstname}</Form.Text>
                </Form.Group>
                <Form.Group className="w-100">
                    <Form.Control type="text" placeholder="Last Name" value={fields.lastname} id="lastname" name="lastname" onChange={handleInputChange} />
                    <Form.Text className="text-danger d-block text-start"> {errors.lastname}</Form.Text>
                </Form.Group>
                <Form.Group className="row g-1">

                    <ButtonGroup className="gender-group">
                        {gender_list.map((radio, idx) => (
                        <ToggleButton
                            className="gender-button"
                            key={idx}
                            id={`radio-${idx}`}
                            type="radio"
                            variant="outline-info"
                            name="gender"
                            value={radio.value}
                            checked={gender === radio.value}
                            onChange={(e) => setGender(e.currentTarget.value)}
                        >
                            {radio.name}
                        </ToggleButton>
                        ))}
                    </ButtonGroup>

                    <Form.Text className="text-danger d-block text-start"> {errors.gender}</Form.Text>
                </Form.Group>

                <Form.Group className="w-100">
                    <Form.Control type="date" placeholder="D.O.B" value={fields.dob} id="dob" name="dob" onChange={handleInputChange} />
                    <Form.Text className="text-danger d-block text-start"> {errors.dob}</Form.Text>
                </Form.Group>
                <Form.Group className="w-100">
                    <Form.Control type="text" placeholder="Street Address 1" value={fields.sa1} id="sa1" name="sa1" onChange={handleInputChange} />
                    <Form.Text className="text-danger d-block text-start"> {errors.sa1}</Form.Text>
                </Form.Group>
                <Form.Group className="w-100">
                    <Form.Control type="text" placeholder="Street Address 2" value={fields.sa2} id="sa2" name="sa2" onChange={handleInputChange} />
                    {/* <Form.Text className="text-danger d-block text-start"> {errors.sa2}</Form.Text> */}
                </Form.Group>
                <Form.Group className="w-100">
                    <Form.Control type="text" placeholder="Postcode" value={fields.postcode} id="postcode" name="postcode" onChange={handleInputChange} />
                    <Form.Text className="text-danger d-block text-start"> {errors.postcode}</Form.Text>
                </Form.Group>
                
                <div className="row w-100">
                    <Form.Group className="col ps-0">
                        <Form.Select name="country" className="w-100" onChange={handleInputChange}>
                            <option value="">Country</option>
                            <option value="Australia">Australia</option>
                            <option value="China">China</option>
                            <option value="Ethiopia">Ethiopia</option>
                        
                        </Form.Select>
                        <Form.Text className="text-danger d-block text-start"> {errors.country}</Form.Text>
                    </Form.Group>
                    <Form.Group className="col pe-0">
                        <Form.Select name="state" className="w-100" onChange={handleInputChange}>
                            <option value="">State</option>
                            <option value="NSW">NSW</option>
                            <option value="VIC">VIC</option>
                            
                        </Form.Select>
                        <Form.Text className="text-danger d-block text-start"> {errors.state}</Form.Text>
                    </Form.Group>
                </div>

                <Form.Group className="w-100">
                    <Form.Control type="text" placeholder="Mobile No." value={fields.mobile} id="mobile" name="mobile" onChange={handleInputChange} />
                    <Form.Text className="text-danger d-block text-start"> {errors.mobile}</Form.Text>
                </Form.Group>
                <Form.Group className="w-100">
                    <Form.Control type="email" placeholder="Email" value={fields.email} id="email" name="email" onChange={handleInputChange} />
                    <Form.Text className="text-danger d-block text-start"> {errors.email}</Form.Text>
                </Form.Group>

                <div><ExclamationCircle size={14} /> All information entered is kept secure in accordance with our <Link to="">privacy policy</Link></div>

                <Button variant="primary" type="submit" className='QF-Primary-Button'>Submit</Button>
            </Stack>
        </Form>
    )
}