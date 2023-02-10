import React from "react";
import MiddleContainer from "../../components/LandingPage/Middle";
import SearchAppBar from "../../components/LandingPage/Navbar";
import RecruiterContainer from "../../components/LandingPage/recruiter";
import SeekerContainer from "../../components/LandingPage/seeker";

function LandingPage() {

  return (
    <div>
      <SearchAppBar />
      <SeekerContainer />
      <MiddleContainer/>
      <RecruiterContainer />
    </div>
  );
}

export default LandingPage;
