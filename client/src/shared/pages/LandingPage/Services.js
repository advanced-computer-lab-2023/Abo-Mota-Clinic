import VideoCall from '../../assets/video-call.jpg'
import Prescriptions from '../../assets/prescriptions.jpg';
import Appointments from '../../assets/doctor-appointments.jpg';


export default function Services() {
    return (
      <section className="bg-blue-100 py-12">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold text-blue-900 mb-8">Our Unique Services</h2>
          
          <div className="flex flex-wrap justify-center gap-10">
            {/* Service 1 */}
            <div className="max-w-sm">
              <div className="flex items-center justify-center h-32 w-32 rounded-full bg-white mx-auto overflow-hidden">
                <img src={VideoCall} alt="Video Call" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-semibold mt-5 text-blue-900">Video Call a Doctor</h3>
              <p className="text-gray-600 mt-3">
                Connect with certified doctors at the click of a button for a personal consultation.
              </p>
            </div>
            
            {/* Service 2 */}
            <div className="max-w-sm">
              <div className="flex items-center justify-center h-32 w-32 rounded-full bg-white mx-auto overflow-hidden">
                <img src={Appointments} alt="Book Appointments" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-semibold mt-5 text-blue-900">Book Appointments Online</h3>
              <p className="text-gray-600 mt-3">
                Choose the best time for you and book your appointment online with ease.
              </p>
            </div>
            
            {/* Service 3 */}
            <div className="max-w-sm">
              <div className="flex items-center justify-center h-32 w-32 rounded-full bg-white mx-auto overflow-hidden">
                <img src={Prescriptions} alt="Online Prescriptions" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-semibold mt-5 text-blue-900">Online Prescription Refills</h3>
              <p className="text-gray-600 mt-3">
                Use your prescription to order your medication online and have it delivered.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  } 