import { useState } from "react";
import { useCurrentUserContext } from "../Context/UserContext";
import { Button, Form, Stack, } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../Context/UserActions";

//* This form is currently used for both signing up and singing in.
export default function FormSignUp(props: any) {
    const navigate = useNavigate();
    const { setUser } = useCurrentUserContext();

    interface FieldsData {
        email: string;
        password: string;
        confirm_password: string;
    }

    const [fields, setFields] = useState<FieldsData>(() => {
        return {
            email: "",
            password: "",
            confirm_password: ""
        }
    });

    let valid = {
        email: false,
        password: false,
        confirm_password: false
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

        // Email
        if (!fields.email) {
            setAnError("email", "Email is required")
            valid.email = false;
        }
        else if (!new RegExp(/\S+@\S+\.\S+/).test(fields.email)) {
            setAnError("email", "Incorrect email format");
            valid.email = false;
        }
        else {
            setAnError("email", "");
            valid.email = true;
        }

        // Password
        if (!fields.password) {
            setAnError("password", "Password is required");
            valid.password = false;
        }
        else {
            setAnError("password", "");
            valid.password = true;
        }

        // Confirm Password
        if (!fields.confirm_password) {
            setAnError("confirm_password", "Please confirm password");
            valid.confirm_password = false;
        }
        else if (fields.confirm_password !== fields.password) {
            setAnError("confirm_password", "Passwords do not match.");
            valid.confirm_password = false;
        }
        else {
            setAnError("confirm_password", "");
            valid.confirm_password = true;
        }

        const newUser = {
            email: fields.email,
            password: fields.password
        }

        if (!Object.values(valid).includes(false)) {
            registerUser(setUser, newUser).then(response => {
                alert("Successfully signed up.")
                navigate("/maindashboard");
            }).catch(error => {
                alert("Error signing up!")
                console.log(error.response.data);
                if (error.response.data.email) {
                    setAnError("email", error.response.data.email);
                    valid.email = false;
                };
                if (error.response.data.password) {
                    setAnError("password", error.response.data.password);
                    valid.password = false;
                };
            });
        }
    }

    return (
        <Form onSubmit={handleSubmit} noValidate className="QF-Form-Centered-Narrow">
            <Stack gap={2} className="QF-Home-div">
            <Form.Group className="mb-3">
                <Form.Control type="email" placeholder="Email" value={fields.email} id="email" name="email" onChange={handleInputChange} />
                <Form.Text className="text-danger"> {errors.email}</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Control type="password" placeholder="Password" value={fields.password} id="password" name="password" onChange={handleInputChange} />
                <Form.Text className="text-danger">{errors.password}</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Control type="password" placeholder="Confirm Password" value={fields.confirm_password} id="confirm_password" name="confirm_password" onChange={handleInputChange} />
                <Form.Text className="text-danger">{errors.confirm_password}</Form.Text>
            </Form.Group>

            <Form.Check style={{ textAlign: "left" }}
                type='checkbox'
                id={`default-checkbox`}
                label={<p>I agree to the <Link to="/terms-and-conditions">Terms and Conditions</Link>. </p>}
            />
            <p>
                Find out how Quaefacta collects, uses and manages your data in our <Link to="/privacy-policy">Privacy Policy</Link>.
            </p>
            </Stack>
            <br />
            <Button variant="primary" type="submit" className='QF-Primary-Button'>Register</Button>
            {/* //TODO: Give the button a loading mode when waiting for response */}

        </Form>
    )
}