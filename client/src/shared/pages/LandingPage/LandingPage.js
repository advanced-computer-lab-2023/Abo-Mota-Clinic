import React from 'react';
import Header from './Header';
import Testimonials from './Testimonials'; 
import Services from './Services';
import About from './About';
import Footer from '../../Components/Footer';
// For the navigation and headline section
// import Services from './Services'; // For listing the services offered
// import AboutUs from './AboutUs'; // For the "About the Clinic" section
// import Testimonials from './Testimonials'; // For the patient testimonials
// import Blogs from './Blogs'; // For the latest blogs or news articles
// import Contact from './Contact'; // For the contact information section
// import Footer from './Footer'; // For the footer section

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Header /> {/* The Header section with navigation and main headline */}
      <About />
      <Services/>
      <Testimonials />
       
       
      {/* <Blogs />
      <Contact />  */}
      <Footer />  
    </div>
  );
};

export default LandingPage;


