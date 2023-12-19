import { FaQuoteLeft } from "react-icons/fa"; // Ensure you've installed react-icons
import ceoImage from "../../assets/ahmed-labib.png"; // Ensure the path is correct
import Button from "../../Components/Button";

const Mission = () => {
  const darkBlueColor = "#1c64f2"; // This is the dark blue color used earlier

  return (
    <section className="bg-white py-12 mt-12">
      <div className="container mx-auto px-4 md:px-6 flex flex-wrap items-center">
        {/* Image on the left */}
        <div className="flex-initial lg:w-2/5 lg:max-w-2xl mb-8 md:mb-0">
          <img src={ceoImage} alt="Ahmed Labib" className="w-full h-auto" />
        </div>

        {/* Text on the left */}
        <div className="flex-1 lg:w-1/2 text-left">
          <h2 className="text-lg font-semibold mb-4" style={{ color: darkBlueColor }}>
            Our Commitment
          </h2>
          <blockquote className="text-xl md:text-2xl">
            <FaQuoteLeft className="text-4xl mr-4 text-blue-900" />
            <p className="italic text-blue-800">
              An apple a day keeps the doctor away. No more apples.
            </p>
          </blockquote>
          <p className="font-semibold text-lg mt-4">Ahmed Labib, CEO of Abo Mota</p>
          <a href="https://www.linkedin.com/in/ahmed-labib-a85799250/" target='_blank'>
          <Button type="primary" className="mt-4">
            View More
          </Button>
          </a>
          
        </div>
      </div>
    </section>
  );
};

export default Mission;
