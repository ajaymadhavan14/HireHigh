import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/LandingPage/Footer";
import SearchAppBar from "../../components/LandingPage/Navbar";
import RecruiterContainer from "../../components/LandingPage/recruiter";
import SeekerContainer from "../../components/LandingPage/seeker";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div>
      <SearchAppBar />
      <SeekerContainer />
      <RecruiterContainer />
    </div>
  );
}

export default LandingPage;
