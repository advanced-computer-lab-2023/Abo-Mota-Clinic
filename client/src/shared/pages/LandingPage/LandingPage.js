import {useRef} from 'react';
import Header from './Header';
import Testimonials from './Testimonials'; 
import Services from './Services';
import About from './About';
import Footer from '../../Components/Footer';

const LandingPage = () => {
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const testimonialsRef = useRef(null);
  const footerRef = useRef(null);
  const scrollToRef = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAboutClick = ()=>{
    scrollToRef(aboutRef);
  }
  return (
    <div >
     <Header
        onAboutClick={handleAboutClick}
        onServicesClick={() => scrollToRef(servicesRef)}
        onTestimonialsClick={() => scrollToRef(testimonialsRef)}
        onFooterClick={() => scrollToRef(footerRef)}
      />
      <div ref={aboutRef}><About /></div>
      <div ref={servicesRef}><Services /></div>
      <div ref={testimonialsRef}><Testimonials /></div>
      <div ref={footerRef}><Footer onAboutClick={handleAboutClick} /></div>
       
    </div>
  );
};

export default LandingPage;


