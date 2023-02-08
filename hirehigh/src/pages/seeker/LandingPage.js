import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/seeker/Footer";
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
      <Footer />
    </div>
  );
}

export default LandingPage;
