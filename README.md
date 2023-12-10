# Virtual Clinic - A Comprehensive Healthcare Management System

## Motivation

In the pursuit of making healthcare more accessible and management more seamless, this project was born out of the need to bridge the gap between patients and healthcare providers. The Virtual Clinic platform is designed to offer an integrated environment for patients, doctors, and administrators to interact, manage medical records, and facilitate healthcare services efficiently.

## Build Status

The current build is in the alpha stage with core functionalities implemented. Continuous integration is in place, ensuring build stability. Known issues are documented and tracked for resolution.

## Code Style

The project adheres to the "standard" coding conventions for clarity and maintainability. This ensures that contributions and reviews can be conducted with ease, maintaining a consistent codebase.

## Screenshots

![Screenshot](screen1%20clinic.jpg)
![Screenshot](clinic2.jpg)
![Screenshot](clinic%203.jpg)


## Tech/Framework Used

![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![Redux](https://img.shields.io/badge/Built%20with-Redux-%23f44336?style=for-the-badge)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

- **Backend**: Node.js, Express
- **Frontend**: React.js, Redux for state management
- **Database**: MongoDB
- **Authentication**: JWT for secure login sessions



## Features

### Guest Registration
- Registration options for both patients and doctors with detailed personal and professional information.

### Document Management
- Allows patients to upload or remove medical documents.
- Guests registering as doctors must submit identification, medical licenses, and degrees.

### Login and Logout
- Secure access for doctors, patients, and administrators using usernames and passwords.

### Administrator Privileges
- Administrators can add or remove users, including doctors, patients, and other administrators.
- They review and decide on doctor registration requests and manage health packages.

### Password Management
- Users can change or reset passwords with email-based OTPs for security.

### Doctor Features
- Doctors can edit profiles, set hourly rates, manage affiliations, add availability for appointments, and handle prescriptions and health records.

### Patient Features
- Patients can add family members, link other patient accounts, manage payment options, and view and subscribe to health packages.
- Schedule, reschedule, or cancel appointments.
- View health records and prescriptions.

### Appointments and Health Records
- Both doctors and patients can filter and view appointments and health records.
- Doctors have access to their patients' information.

### Prescription Management
- Doctors manage prescriptions, and patients can view and pay for them using various methods.

### Communication and Notifications
- Chat functionality and notifications for appointments and prescription statuses.

### Video Calls
- Facilitate video calls between doctors and patients.

### Follow-up Sessions
- Patients can request follow-ups, and doctors can manage these requests.

### Financial Transactions
- Users can view wallet balances, receive refunds, and make payments for services and prescriptions.

## Detailed Features

### Account Registration
- Comprehensive registration for patients and doctors.

### User Authentication
- Secure login and logout for all user roles.

### Administrator Capabilities
- Account management and oversight of doctor registrations.

### Profile and Password Management
- Profile updates and secure password management.

### Doctor-Specific Functionalities
- Professional detail management and appointment scheduling.

### Patient-Centric Features
- Family management, appointment handling, and health package subscriptions.

### Appointment Management
- Comprehensive appointment scheduling system.

### Prescription Handling
- Detailed prescription management and payment options.

### Communication and Alerts
- Integrated chat system and timely notifications.

### Video Consultations
- Video calling feature for virtual consultations.

### Financial Management
- Financial transactions, wallet management, and refund processing.


## Code Examples

*Code snippets will be  here.*

### Installation

Clone the repository:

   ```bash
   git clone https://github.com/advanced-computer-lab-2023/Abo-Mota-Clinic.git
   cd Abo-Mota-Clinic
   ```
   
# Install client dependencies

  ```bash
  cd client
  npm install
```
# Install server dependencies
  ```bash
    cd backend
    npm install
```
# Running the Application
## Start the client:
 ```bash
cd client
cd src
npm start
```
The client server will run on http://localhost:3000.
## Start the server:
 ```bash
cd backend
nodemon server.js
 ```

Open your browser and navigate to http://localhost:3000 to access the simulator.

## How to Use

The Virtual Clinic system is designed to be intuitive and user-friendly. Here is a step-by-step guide to help you navigate through the main functionalities:

### For Patients

1. **Creating an Account**: Start by registering as a patient with your personal details on the Virtual Clinic platform.
2. **Logging In**: Use your credentials to log in and access patient-specific functionalities.
3. **Managing Medical Records**: Upload and manage your medical documents securely within the platform.
4. **Booking Appointments**: Browse available doctors, view their schedules, and book appointments that suit your convenience.
5. **Managing Prescriptions**: View and manage your prescriptions, with options to pay for them directly through the platform.

### For Doctors

1. **Registration**: Sign up as a doctor by submitting your professional credentials for verification.
2. **Appointment Management**: Set your availability and manage appointments scheduled by patients.
3. **Patient Records**: Access and review your patient's medical history and documents to provide the best care possible.

### For Administrators

1. **Account Oversight**: Manage user accounts, including the ability to add or remove patients, doctors, and other administrators.
2. **System Monitoring**: Oversee the system's operations and ensure everything runs smoothly, addressing any technical issues that arise.

### Navigating the Interface

- Use the navigation bar to easily switch between different sections of the platform.
- Access your profile to update personal information or change your password.
- For any assistance, visit the 'Help' section or contact our support team.

Remember to log out after your session to maintain the security of your account.
## API Refrences 


## Tests

## Contribute

We welcome contributions that help enhance the features and functionalities of the Pharmacy Management System. Please refer to the contribution guidelines for the process and standards we follow.

## Credits

## License

