// Import the required icons from react-icons if needed
import { FaQuoteLeft } from 'react-icons/fa';
import Image from '../../assets/testimonial picture.png';
import nada from '../../assets/nada-ibrahim.png';
import mabrouk from '../../assets/mohamed-mabrouk.jpg'
import mervat from '../../assets/mervat.jpg';
import starIcon from '../../assets/star-icon.png'
import { RxDragHandleDots1 } from "react-icons/rx";
const testimonialsData = [
    {
      quote: "My only regret in life is not being the product manager of Abo mota!",
      author: "Nada Ibrahim",
      avatar: nada 
    },
    {
      quote: "Amr Diab is a lucky man indeed. Being the product manager of Abo-mota is a once-in-a-lifetime opportunity!",
      author: "Mohamed Mabrouk",
      avatar: mabrouk
    },
    {
      quote: "The gui bonus is just a matter of time!",
      author: "Mervat Abu-Elkheir",
      avatar: mervat
    },
    {
      quote: "Their scrum master really outdone himself!",
      author: "Amr Diab",
      avatar: mabrouk
    }
  ];

const Testimonials = () => {
  
    return (
          <section className="py-12 bg-white relative text-center">
      <div className="container mx-auto px-6 relative mb-24">
        <h2 className="text-3xl font-semibold text-center text-blue-900 mb-12">What Our Clients Say About Us</h2>
        <div className="flex justify-center items-center mt-16">
          <img src={Image} alt="Central Figure" className="w-[30rem] h-[30rem]" />
        </div>
  
        <div className="absolute left-0 transform translate-x-[23rem] -translate-y-16"> {/* Example using a custom value */}
          <TestimonialCard quote={testimonialsData[0].quote} author={testimonialsData[0].author} avatar={testimonialsData[0].avatar} />
        </div>
        <div className="absolute right-0 transform -translate-x-[26rem] -translate-y-16"> {/* Example using a custom value */}
          <TestimonialCard quote={testimonialsData[1].quote} author={testimonialsData[1].author} avatar={testimonialsData[1].avatar} />
        </div>
        <div className="absolute top-0  left-0 transform translate-x-[17rem] translate-y-48"> {/* Example using a custom value */}
          <TestimonialCard quote={testimonialsData[2].quote} author={testimonialsData[2].author} avatar={testimonialsData[2].avatar} />
        </div>
        <div className="absolute top-0 right-0 transform -translate-x-[26rem] translate-y-32"> {/* Example using a custom value */}
          <TestimonialCard quote={testimonialsData[3].quote} author={testimonialsData[3].author} avatar={testimonialsData[3].avatar} />
        </div>
        <div className="absolute  left-0 transform translate-x-20  -translate-y-4">
        <RxDragHandleDots1 className=" w-32 h-32" style={{ color: '#7ccafc' }}/>
      </div>
      </div>
      <div className="absolute top-0 right-0 transform -translate-x-56 translate-y-12">
        <img src={starIcon} alt="Star" className="w-24 h-24" />
      </div>
      
      
    </section>
      );
};



const TestimonialCard = ({ quote, author, avatar }) => {
  return (
    <div className="relative flex flex-col items-start w-72"> {/* Container */}
      <div className="absolute ml-8 -top-12 "> {/* Image container */}
        <img className="w-16 h-16 rounded-full " src={avatar} alt={author} />
      </div>
      <div className="bg-white rounded-lg shadow-md w-96 px-4 py-4 pt-8 text-left"> {/* Adjusted card */}
        <p className="text-gray-600 text-sm mb-2">{quote}</p>
        <p className="font-bold text-md text-blue-900">{author}</p>
      </div>
    </div>
  );
};


export default Testimonials;
