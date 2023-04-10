import { useState } from "react";
import { useCurrentUserContext } from "../Context/UserContext";
import { Button, Form, Stack, } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../Context/UserActions";

//* This form is currently used for both signing up and singing in.
export default function FormSignUp(props: any) {
    const navigate = useNavigate();
    const { setUser } = useCurrentUserContext();

    interface FieldsData {
        email: string;
        password: string;
    }

    const [fields, setFields] = useState<FieldsData>(() => {
        return {
            email: "",
            password: "",
        }
    });

    let valid = {
        email: false,
        password: false,
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

        const loginDetails = {
            email: fields.email,
            password: fields.password
        }

        if (!Object.values(valid).includes(false)) {
            loginUser(setUser, loginDetails).then(response => {
                alert("Successfully signed in.")
                navigate("/maindashboard");
            }).catch(error => {
                alert("Error signing in!")
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

            <Button variant="primary" type="submit" className='QF-Primary-Button'>Submit</Button>
            </Stack>
            <hr />
            <Button variant="link">Forgot Password?</Button>

        </Form>
    )
}