import { useRef, useState } from "react";
import { Button, Form, Stack, Badge } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ExclamationCircle } from "react-bootstrap-icons";
import { editUserInformation } from "../Context/UserActions";
import React from "react";

//* This form is currently used for both signing up and singing in.
export default function FormMedicalProfile(props: any) {
    const navigate = useNavigate();

    const [conditionsList, setConditionsList] = React.useState<string[]>([])
    const [allergiesList, setAllergiesList] = React.useState<string[]>([])

    interface FieldsData {
        height: string;
        weight: string;
        blood_type: string;
        name: string;
        age: string;
        allergies: string;
        conditions: string;
        phone: string;
        relation: string;
    }

    const [fields, setFields] = useState<FieldsData>(() => {
        return {
            height: "",
            weight: "",
            blood_type: "",
            name: "",
            age: "",
            allergies: "",
            conditions: "",
            phone: "",
            relation: "",
        }
    });

    let valid = {
        height: false,
        weight: false,
        blood_type: false,
        name: false,
        age: false,
        // conditions: false,
        // allergies: false,
        phone: false,
        relation: false,
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

        if (!fields.name) {
            setAnError("name", "First name is required")
            valid.name = false;
        } else {
            setAnError("name", "");
            valid.name = true;
        }

        if (!fields.age) {
            setAnError("age", "D.O.B is required")
            valid.age = false;
        } else if ((new Date(fields.age)).getTime() > (new Date()).getTime()) {
            setAnError("age", "D.O.B must before today")
            valid.age = false;
        } else {
            setAnError("age", "");
            valid.age = true;
        }

        if (!fields.phone) {
            setAnError("phone", "phone is required")
            valid.phone = false;
        } else {
            setAnError("phone", "");
            valid.phone = true;
        }

        if (!fields.relation) {
            setAnError("relation", "relation is required")
            valid.relation = false;
        } else {
            setAnError("relation", "");
            valid.relation = true;
        }

        const personalDetails = fields;


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


    const allergiesRef = useRef(null);
    // const conditionsRef = useRef(null);

    const addAllergies = () => {
        if (fields.allergies !== "") {
            setAllergiesList([...allergiesList, fields.allergies])
        }
        fields.allergies = ""
    }

    const addConditions = () => {
        if (fields.conditions !== "") {
            setConditionsList([...conditionsList, fields.conditions])
        }
        fields.conditions = ""
    }

    function removeCondition(condition: string) {
        let temp: string[] = []
        temp = conditionsList
        const index = temp.indexOf(condition);
        if (index > -1) { // only splice array when item is found
            temp.splice(index, 1); // 2nd parameter means remove one item only
        }
        setConditionsList(temp) 

        // TODO: Reset conditions field
        fields.conditions = ""
    }

    function removeAllergy(allergy: string) {
        let temp: string[] = []
        temp = allergiesList
        const index = temp.indexOf(allergy);
        if (index > -1) { // only splice array when item is found
            temp.splice(index, 1); // 2nd parameter means remove one item only
        }
        setAllergiesList(temp) 
    }


    return (
        <Form onSubmit={handleSubmit} noValidate className="QF-Form-Centered-Narrow max-width">
            <Stack gap={3} className="QF-Home-div">
                <Form.Group className="w-100">
                    <Form.Select name="blood_type" className="w-100" onChange={handleInputChange}>
                        <option value="">Blood Type (if known)</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="AB">AB</option>
                        <option value="O">O</option>
                    </Form.Select>
                    <Form.Text className="text-danger d-block text-start"> {errors.blood_type}</Form.Text>
                </Form.Group>

                <div className="row w-100">
                    <Form.Group className="col-6 ps-0">
                        <Form.Control type="text" placeholder="Height (cm)" value={fields.height} id="height" name="height" onChange={handleInputChange} className="min-width-auto" />
                        <Form.Text className="text-danger d-block text-start"> {errors.height}</Form.Text>
                    </Form.Group>
                    <Form.Group className="col-6 pe-0">
                        <Form.Control type="text" placeholder="Weight (kg)" value={fields.weight} id="weight" name="weight" onChange={handleInputChange} className="min-width-auto" />
                        <Form.Text className="text-danger d-block text-start"> {errors.weight}</Form.Text>
                    </Form.Group>
                </div>

                <Form.Group className="w-100">
                    <Form.Control type="text" placeholder="Age" value={fields.age} id="age" name="age" onChange={handleInputChange} className="min-width-auto" />
                </Form.Group>

                <Form.Group className="w-100">
                    <Form.Check reverse label="Aboriginal/Torres Strait Islander" name="islander" type="checkbox" id="islander" />
                </Form.Group>

                <Form.Group className="w-100">
                    <Form.Check reverse label="Pregnant" name="pregnant" type="checkbox" id="pregnant" />
                </Form.Group>

                <Form.Group className="w-100 append-plus">
                    <Form.Control type="text" placeholder="Allergies" value={fields.allergies} id="allergies" name="allergies" onChange={handleInputChange} ref={allergiesRef} />
                    <button className="plus" type="button" onClick={() => {addAllergies()}}>+</button>
                    {allergiesList.map((v) => (
                        <><Badge pill className="append-cross" bg="light">{v} <button className="cross" onClick={() => {removeAllergy(v)}}>x</button></Badge></>
                    ))}
                </Form.Group>

                <Form.Group className="w-100 append-plus">
                    <Form.Control type="text" placeholder="Conditions" value={fields.conditions} id="conditions" name="conditions" onChange={handleInputChange} />
                    <button className="plus" type="button" onClick={() => {addConditions()}}>+</button>
                    {conditionsList.map((v) => (
                        <><Badge pill className="append-cross" bg="light">{v} <button className="cross" onClick={() => {removeCondition(v)}}>x</button></Badge></>
                    ))}
                </Form.Group>

                <div className="text-center w-100">
                    Emergency Contact
                </div>

                <Form.Group className="w-100">
                    <Form.Control type="text" placeholder="Name" value={fields.name} id="name" name="name" onChange={handleInputChange} />
                    <Form.Text className="text-danger d-block text-start"> {errors.name}</Form.Text>
                </Form.Group>
                
                <Form.Group className="w-100">
                    <Form.Control type="text" placeholder="Phone" value={fields.phone} id="phone" name="phone" onChange={handleInputChange} />
                    <Form.Text className="text-danger d-block text-start"> {errors.phone}</Form.Text>
                </Form.Group>
                <Form.Group className="w-100">
                    <Form.Control type="text" placeholder="Relation" value={fields.relation} id="relation" name="relation" onChange={handleInputChange} />
                    <Form.Text className="text-danger d-block text-start"> {errors.relation}</Form.Text>
                </Form.Group>

                <div><ExclamationCircle size={14} /> All information entered is kept secure in accordance with our <Link to="">privacy policy</Link></div>

                <Button variant="primary" type="submit" className='QF-Primary-Button'>Submit</Button>
            </Stack>
        </Form>
    )
}