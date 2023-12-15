import { FaPhone, FaEnvelope, FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return (
      <footer className="bg-blue-900 text-white">
        <div className="container mx-auto px-6 py-10">
          <div className="flex flex-wrap -mx-6 justify-between items-start">
  
            <ContactSection/>
  
            <div className="px-6 w-full lg:w-1/4 mb-8">
  <h5 className="text-xl font-bold mb-4">Links</h5>
  <ul className="list-none">
    <li className="mb-2">
      <a href="/how-it-works" className="text-sm text-gray-300 hover:text-white transition-colors duration-300">How it works</a>
    </li>
    <li className="mb-2">
      <a href="/apartments" className="text-sm text-gray-300 hover:text-white transition-colors duration-300">Apartments</a>
    </li>
    <li className="mb-2">
      <a href="/privacy-policy" className="text-sm text-gray-300 hover:text-white transition-colors duration-300">Privacy and policy</a>
    </li>
    <li className="mb-2">
      <a href="/contact" className="text-sm text-gray-300 hover:text-white transition-colors duration-300">Contact</a>
    </li>
  </ul>
</div>

<div className="px-6 w-full lg:w-1/4 mb-8">
  <h5 className="text-xl font-bold mb-4">Department</h5>
  <ul className="list-none">
    <li className="mb-2">
      <a href="/about-us" className="text-sm text-gray-300 hover:text-white transition-colors duration-300">About us</a>
    </li>
    <li className="mb-2">
      <a href="/how-it-works" className="text-sm text-gray-300 hover:text-white transition-colors duration-300">How it works</a>
    </li>
    <li className="mb-2">
      <a href="/apartments" className="text-sm text-gray-300 hover:text-white transition-colors duration-300">Apartments</a>
    </li>
    <li className="mb-2">
      <a href="/privacy-policy" className="text-sm text-gray-300 hover:text-white transition-colors duration-300">Privacy and policy</a>
    </li>
    <li className="mb-2">
      <a href="/contact" className="text-sm text-gray-300 hover:text-white transition-colors duration-300">Contact</a>
    </li>
  </ul>
</div>

            <OpeningHours/>
          </div>
          <div className="text-center text-gray-400 text-sm mt-12">
            Copyright © 2023 All Rights Reserved by ARH AM Tech pro
          </div>
        </div>
      </footer>
    );
  };



  const ContactSection = () => {
    return (
      <div className="px-6 w-full lg:w-1/4 mb-12 text-white">
        <div className="flex flex-col items-start justify-start mb-8">
          <span className="text-4xl font-bold mb-6">Abo Mota</span>
          <p className="text-gray-300 text-base mb-10">
            Filter out the noise and nurture your inbox advice that's inclusive and rooted in medical.
          </p>
          <div className="flex items-center mb-6">
            <FaPhone className="text-blue-300 mr-3 h-6 w-6" />
            <p className="text-base">+20 100 098 1773</p>
          </div>
          <div className="flex items-center mb-8">
            <FaEnvelope className="text-blue-300 mr-3 h-6 w-6" />
            <p className="text-base">abomota@gmail.com</p>
          </div>
        </div>
        <div className="flex justify-start">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="mr-4">
            <FaFacebookF className="h-6 w-6 text-blue-600" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="mr-4">
            <FaTwitter className="h-6 w-6 text-blue-400" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="mr-4">
            <FaLinkedinIn className="h-6 w-6 text-blue-700" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="h-6 w-6 text-pink-600" />
          </a>
        </div>
      </div>
    );
  }
  

const OpeningHours=()=>{
    return(<div className="px-6 w-full lg:w-1/4 mb-8">
    <h5 className="text-xl font-bold mb-4">Opening Hours</h5>
    <ul className="list-none">
      <li className="mb-2 text-sm text-gray-300">Mon - Tues: 9 AM - 5 PM</li>
      <li className="mb-2 text-sm text-gray-300">Sat - Mon: 10 AM - 5 PM</li>
      <li className="mb-2 text-sm text-gray-300">Sun: Emergency</li>
    </ul>
  </div>);
}


  
  export default Footer;
  