import Mission from "./Mission";
import { FaCheckCircle, FaUserMd, FaShieldAlt, FaClock } from 'react-icons/fa';

export default function About() {
  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-6 flex flex-col items-center justify-center">
        <h2 className="text-3xl font-semibold text-center text-blue-900 mb-12">Why You Should Trust Us</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <ReasonCard
            title="Certified Experts"
            description="Our team consists of board-certified professionals recognized in their fields."
            icon={<FaCheckCircle />}
            color="blue-900"
          />

          <ReasonCard
            title="Experienced Staff"
            description="Our staff brings years of experience in providing top-notch services."
            icon={<FaUserMd />}
            color="blue-900"
          />

          <ReasonCard
            title="Security First"
            description="We prioritize your security and take measures to protect your data."
            icon={<FaShieldAlt />}
            color="blue-900"
          />

          <ReasonCard
            title="Timely Service"
            description="We value your time and deliver our services promptly."
            icon={<FaClock />}
            color="blue-900"
          />
        </div>

        {/* CEO Quote and Image */}
        <Mission />
      </div>
    </section>
  );
}
function ReasonCard({ title, description, icon }) {
    return (
      <div className="bg-blue-100 rounded-xl p-6 flex flex-col items-center justify-center transition-all text-blue-900 hover:bg-blue-900 hover:text-white">
        {/* Icon */}
        <div className="text-4xl mb-3">{icon}</div>
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className=" text-center">{description}</p>
      </div>
    );
  }
  
  
  
  
  
  
  
  