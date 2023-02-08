
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../../components/seeker/Footer'
import SearchAppBar from '../../components/seeker/LandingPage/Navbar'
import RecruiterContainer from '../../components/seeker/LandingPage/recruiter'
import SeekerContainer from '../../components/seeker/LandingPage/seeker'

function LandingPage() {
    const navigate = useNavigate()

  return (
    <div>
    <SearchAppBar/>
    <SeekerContainer/>
    <RecruiterContainer/>
    <Footer/>
         
    </div>
  )
}

export default LandingPage
