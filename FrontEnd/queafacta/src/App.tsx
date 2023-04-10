import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import UserProfile from './Components/UserProfile';
import PageNotFound from "./Components/PageNotFound";

import { CurrentUserContext } from './Context/UserContext';

import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";

import { Container } from 'react-bootstrap';
import DocumentUpload from './Components/DocumentUpload';
import MainDashboard from "./Components/MainDashboard";
import NewHere from './Components/NewHere';
import Documents from "./Components/Documents";
import PersonalInfo from "./Components/PersonalInfo";
import MedicareInfo from "./Components/MedicareInfo";
import AddMedicare from "./Components/AddMedicare";
import MedicalProfile from "./Components/MedicalProfile";
import UpdateMedicalProfile from "./Components/UpdateMedicalProfile";
import TermsConditions from "./Components/TermsConditions";
import PrivacyPolicy from "./Components/PrivacyPolicy";
import SignUpProcess from "./Components/SignUpProcess";

function App() {
  let currentUserJsonString = localStorage.getItem("currentUser");
  const [user, setUser] = useState<any>(currentUserJsonString ? JSON.parse(currentUserJsonString) : null);

  return (
    <BrowserRouter>
      <div className="app">
        <CurrentUserContext.Provider value={{ user, setUser }}>
          <Header />
          <Container className="QF-App-MainContainer">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/newhere" element={<NewHere />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/terms-and-conditions" element={<TermsConditions />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />

              {/* Private Routes */}
              <Route path="/maindashboard" element={<MainDashboard />} />
              <Route path="/medicareinfo" element={<MedicareInfo />} />
              <Route path="/personalinfo" element={<PersonalInfo />} />
              <Route path="/addmedicare" element={<AddMedicare />} />
              <Route path="/userprofile" element={<UserProfile />} />
              <Route path="/documentupload" element={<DocumentUpload />} />
              <Route path="/documents" element={<Documents />} />
              <Route path="/personalinfo" element={<PersonalInfo />} />
              <Route path="/medicalprofile" element={<MedicalProfile />} />
              <Route path="/updatemedicalprofile" element={<UpdateMedicalProfile />} />
              <Route path="/signupprocess" element={<SignUpProcess />} />

              {/* Page not found */}
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Container>
          <Footer />
        </CurrentUserContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
