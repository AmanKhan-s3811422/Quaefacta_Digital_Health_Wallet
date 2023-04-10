import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import user from "@testing-library/user-event";

import Home from '../Components/Home';
import NewHere from '../Components/NewHere';
import SignUp from '../Components/SignUp';
import SignIn from '../Components/SignIn';
import MainDashboard from '../Components/MainDashboard';
import PersonalInfo from '../Components/PersonalInfo';
import DocumentUpload from '../Components/DocumentUpload';
import Documents from '../Components/Documents';
import React from 'react';


// These unit tests will need to be expanded upon.

test("Unit Test - Home", () => {
    render(
        <MemoryRouter>
            <Home />
        </MemoryRouter>
    );
    
    expect(screen.getByText('Welcome to Quaefacta Health').textContent).toBe('Welcome to Quaefacta Health');
    expect(screen.getByText('Please select your country and language.').textContent).toBe('Please select your country and language.');
    expect(screen.getByText('Continue').textContent).toBe('Continue');
})

test("Unit Test - NewHere", () => {
    render(
        <MemoryRouter>
            <NewHere />
        </MemoryRouter>
    );
    
    expect(screen.getByText('Are you new here?').textContent).toBe('Are you new here?');
    expect(screen.getByText('Manage your vaccinations and personal health information, for a lifetime of good health.').textContent).toBe('Manage your vaccinations and personal health information, for a lifetime of good health.');
    expect(screen.getByText('Existing user?').textContent).toBe('Existing user?');
})

test("Unit Test - SignUp", async () => {
    render(
        <MemoryRouter>
            <SignUp />
        </MemoryRouter>
    );
    
    expect(screen.getByText('Register an account').textContent).toBe('Register an account');
    expect(screen.getByText('Register').textContent).toBe('Register');

    const getEmailBox = async () => {
        return await screen.findByPlaceholderText('Email');
    };

    const emailField = await getEmailBox();
    user.type(emailField, "ligma@bruh.nocap");
    expect(screen.getByDisplayValue('ligma@bruh.nocap')).toBeInTheDocument();
})

test("Unit Test - SignIn", async () => {
    render(
        <MemoryRouter>
            <SignIn />
        </MemoryRouter>
    );
    
    expect(screen.getByText('Welcome back!').textContent).toBe('Welcome back!');
    expect(screen.getByText('Forgot Password?').textContent).toBe('Forgot Password?');

    const getEmailBox = async () => {
        return await screen.findByPlaceholderText('Email');
    };

    const emailField = await getEmailBox();
    user.type(emailField, "ligma@bruh.nocap");
    expect(screen.getByDisplayValue('ligma@bruh.nocap')).toBeInTheDocument();
})

test("Unit Test - MainDashboard", async () => {
    render(
        <MemoryRouter>
            <MainDashboard />
        </MemoryRouter>
    );
    
    expect(screen.getByText('Personal').textContent).toBe('Personal');
    expect(screen.getByText('Data and Permissions').textContent).toBe('Data and Permissions');
})

test("Unit Test - PersonalInfo", async () => {
    render(
        <MemoryRouter>
            <PersonalInfo />
        </MemoryRouter>
    );
    
    expect(screen.getByPlaceholderText('First Name')).toBeInTheDocument();
})

test("Unit Test - DocumentUpload", async () => {
    render(
        <MemoryRouter>
            <DocumentUpload />
        </MemoryRouter>
    );
    
    expect(screen.getByText('Reports and Monitoring')).toBeInTheDocument();
})

test("Unit Test - Documents", async () => {
    render(
        <MemoryRouter>
            <Documents />
        </MemoryRouter>
    );
    
    expect(screen.getByText('Tap on a document to view')).toBeInTheDocument();
})