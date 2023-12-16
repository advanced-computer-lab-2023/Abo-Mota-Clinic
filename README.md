<!--
<div id="top"></div>





<div align="center" >
   
[![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)](https://www.javascript.com)
[![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://html.com/html5/)
![Redux](https://img.shields.io/badge/Built%20with-Redux-%23f44336?style=for-the-badge)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
[![Nodejs](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/en/)
[![ExpressJs](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://GitHub.com/Naereen/badges/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)](https://github.com/omar-sherif9992)
![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)
![Tailwind](https://img.shields.io/badge/tailwindcss-0F172A?&logo=tailwindcss)



</div>

<br>

<div align="center>
   <img src="[https://www.cancham.org.eg/upload/logo.png](https://i.pinimg.com/736x/6c/9b/30/6c9b3009988b071b4b60484622e93f17.jpg)" alt="Logo" width="200" height="120">   
</div>


<a href=""><h1 align="center">Welcome to Abo Mota Clinic</h1></a>




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

We welcome contributions that help enhance the features and functionalities of the Clinic Management System. Please refer to the contribution guidelines for the process and standards we follow.

## Credits

- [Mongoose docs](https://mongoosejs.com/docs/)
- [MongoDB docs](https://www.mongodb.com/)
- [Express docs](https://expressjs.com/en/4x/api.html)
- [ReactJs docs](https://reactjs.org/docs/getting-started.html)
- [Redux docs](https://redux.js.org/api/api-reference)
- [NodeJs docs](https://nodejs.org/en/docs/)
- [Ant Design website](https://ant.design/)
- [Material UI website](https://mui.com/)
- [Stripe docs](https://stripe.com/docs/)
- [MERN Youtube](https://www.youtube.com/channel/UC29ju8bIPH5as8OGnQzwJyA)
- [Stripe Youtube](https://youtu.be/1r-F3FIONl8)
- [JWT](https://www.youtube.com/watch?v=mbsmsi7l3r4)
- [Sockets.io docs](https://socket.io/)
- [Tailwind docs](https://tailwindcss.com/docs/)


## License
- The software is open source under the Apache 2.0 License.

- The Stripe is licensed under the Apache License 2.0
-->




 
 # Abo Mota Clinic




## Motivation
Abo Mota Clinic is a full-stack, fully featured virtual clinic platform made with the MERN stack. Abo Mota Clinic aims to easily connect patients to high quality healthcare professionals, as well as provide an opportunity for doctors of all disciplines to practice their craft and communicate constantly with their patients to offer the best online healthcare experience possible.
## Build Status
- The project is currently in development.
- The project needs to be deployed through services.
- The project needs a robust unit test suite made with frameworks such as Jest. 
- A message broker needs to be added to the application to handle asynchronous tasks such as sending emails and notifications.
## Code Style
- [Eslint](https://eslint.org/docs/latest/user-guide/getting-started) : in the backend and the frontend to write the most optimum clean code possible and to define rules for the team to be able to write code in the same code style
- [Prettier](https://prettier.io/) : it is a code formatter that runs automatically before each commit on the whole code so that the codes looks well formatted across the whole project
## Tech Stack
<div align="center" >
   
[![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)](https://www.javascript.com)
[![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://html.com/html5/)
![Redux](https://img.shields.io/badge/Built%20with-Redux-%23f44336?style=for-the-badge)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
[![Nodejs](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/en/)
[![ExpressJs](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://GitHub.com/Naereen/badges/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)](https://github.com/omar-sherif9992)
![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)
![Tailwind](https://img.shields.io/badge/tailwindcss-0F172A?&logo=tailwindcss)

</div>

- **Backend**: Node.js, Express, Mongoose, Socket.io, Nodemailer
- **Frontend**: React.js, Material-UI, Ant ,Redux , Socket.io, Tailwind
- **Database**: MongoDB
- **Authentication**: JWT
- **APIs**: Stripe
- **Development tools**: Postman, Git, GitHub
## Features
<details>
<summary>As a Guest I can</summary>

- Register as a patient with personal and emergency contact details.
- Submit a request to register as a doctor with my professional details and required documentation.

</details>

<details>
<summary>As a Patient I can</summary>

- Upload and remove my medical documents.
- Add and manage family members in my account.
- Manage payment options and transactions.
- Schedule, view, reschedule, cancel, and request follow-up appointments.
- View and subscribe to health packages, manage subscriptions, and view package statuses.
- View, filter, and select health records and prescriptions; pay for prescriptions.
- Interact via chat and video calls with doctors.
- Receive notifications and view wallet balances.

</details>

<details>
<summary>As a Doctor I can</summary>

- Login to my profile, edit professional details, and view employment contracts.
- Add available timeslots and manage appointments and follow-ups.
- View and filter patient lists, health records, and manage prescriptions.
- Interact via chat and video calls with patients.
- Receive and manage notifications of appointment changes.

</details>

<details>
<summary>As an Administrator I can</summary>

- Add or remove any user and manage other administrators.
- Review and manage doctor registration requests and their contracts.
- Create, update, and delete health packages with varying price ranges.

</details>

<details>
<summary>Shared Features for Patients, Doctors, and Administrators</summary>

- Secure login and logout processes.
- Password changes and reset functions through OTP.
- View and filter detailed lists of doctors, patients, and health records.
- Financial management including wallet transactions and refund processing.

</details>



## Installation

### Clone the repository:

   ```bash
   git clone https://github.com/advanced-computer-lab-2023/Abo-Mota-Clinic.git
   cd Abo-Mota-Clinic
   ```
   
### Install client dependencies

  ```bash
  cd client
  npm install
```
### Install server dependencies
  ```bash
    cd backend
    npm install
```
    
## How to use
#### Start the client:
 ```bash
cd client
cd src
npm start
```
The client server will run on http://localhost:3000.
#### Start the server:
 ```bash
cd backend
nodemon server.js
 ```
## Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.


## API Reference

### Guest Routes

#### Register Patient
- **Endpoint**: `POST /api/guest/registerPatient`
- **Description**: Registers a new patient.
- **Controller**: `registerPatient`
    - Handles patient registration.
- **Body Parameters**: 
  | Parameter   | Type   | Description    |
  |-------------|--------|----------------|
  | `name`      | string | Patient's name |
  | `username`  | string | User's username|
  | `nationalId`| string | National ID    |
  | `password`  | string | Account password|
  | `email`     | string | Email address  |
  | `dob`       | date   | Date of Birth  |
  | `mobile`    | number | Phone Number |
  | `gender`    | string | Gender (male or female) |
   | `emergencyContact.name`        | string | Emergency contact's name       |
  | `emergencyContact.mobile`      | string | Emergency contact's mobile     |
  | `emergencyContact.relation`    | string | Relation to emergency contact  |

#### Register Doctor
- **Endpoint**: `POST /api/guest/registerDoctor`
- **Description**: Registers a new doctor with file uploads for credentials.
- **Controller**: `registerDoctor`
  - Manages doctor registration and file uploads.
- **Body Parameters**: 
  | Parameter   | Type   | Description       |
  |-------------|--------|-------------------|
  | `name`      | string | Patient's name |
  | `username`  | string | User's username|
  | `nationalId`| file | National ID File |
  | `password`  | string | Account password|
  | `email`     | string | Email address  |
  | `dob`       | date   | Date of Birth  |
  | `specialty` | string | Specialty like (heart, etc.)|
  | `educationalBackground` | string | Educational Background|
  | `affiliation` | string | Affiliation of Dr. |
  | `specialty` | string | Specialty of Dr. |
  | `mobile`    | number | Phone Number |
  | `gender`    | string | Gender (male or female) |
  | `medicalLicense`| file| Medical license file|
  | `medicalDegree`| file | Medical degree file|

#### Request OTP
- **Endpoint**: `POST /api/guest/otp`
- **Description**: Requests a new OTP for password reset.
- **Controller**: `requestOtp`
  -  Requests OTP for password reset.
- **Body Parameters**:   
  | Parameter   | Type   | Description    |
  |-------------|--------|----------------|
  | `email`     | string | Email address  |

#### Forgot Password
- **Endpoint**: `POST /api/guest/forgotPassword`
- **Description**: Reset forgotten passwords.
- **Controller**: `forgotPassword`
  -  Resets forgotten passwords.
- **Body Parameters**: 
  | Parameter   | Type   | Description    |
  |-------------|--------|----------------|
  | `email`     | string | Email address  |
  | `otp`       | string | OTP code       |
  | `newPassword`| string| New password   |

#### Login
- **Endpoint**: `POST /api/guest/login`
- **Description**: Authenticates a user and logs them in.
- **Controller**: `login`
  -  Handles user login.
- **Body Parameters**: 
  | Parameter   | Type   | Description    |
  |-------------|--------|----------------|
  | `username`  | string | User's username|
  | `password`  | string | Account password|

#### Logout
- **Endpoint**: `POST /api/guest/logout`
- **Description**: Logs out the current user.
- **Controller**: `logout`
  -  Logs out the user.




### Stripe Routes

#### Get Configurations
- **Endpoint**: `GET /api/stripe/config`
- **Description**: Retrieves Stripe configuration details.
- **Controller**: `config`
  - Returns Stripe publishable key.

#### Create Payment Intent
- **Endpoint**: `POST /api/stripe/create-payment-intent`
- **Description**: Creates a new payment intent for Stripe transactions.
- **Controller**: `createPaymentIntent`
    - Stripe Payment Intent Creation.
- **Body Parameters**: 
  | Parameter     | Type   | Description               |
  |---------------|--------|---------------------------|
  | `beneficiary` | string | Description of beneficiary|
  | `amount`      | number | Transaction amount in USD |


### Common Routes (Notifications and Messages)

#### Get Messages
- **Endpoint**: `GET /api/common/message`
- **Description**: Retrieves messages for a user and certain recipient.
- **Controller**: `getMessages`
  - Retrieves user-specific messages based on username and recipient. 
- **Query Parameters**: 
  | Parameter    | Type   | Description              |
  |--------------|--------|--------------------------|
  | `recipient`  | string | Id of the recipient|

#### Send Message
- **Endpoint**: `POST /api/common/message`
- **Description**: Sends a new message.
- **Controller**: `sendMessage`
  - Sends messages from users, storing sender and recipient info.
- **Body Parameters**: 
  | Parameter    | Type   | Description              |
  |--------------|--------|--------------------------|
  | `content`    | string | Message content          |
  | `recipient`  | string | Id of the recipient|

#### Get Notifications
- **Endpoint**: `GET /api/common/notifications`
- **Description**: Retrieves notifications for a user.
- **Controller**: `getNotifications`
  - Retrieves all notifications for a user.

#### Send Notification
- **Endpoint**: `POST /api/common/notification`
- **Description**: Sends a new notification.
- **Controller**: `sendNotification`
  - Creates and sends notifications to specified recipients.
- **Body Parameters**: 
  | Parameter         | Type   |Description               |
  |-------------------|--------|---------------------------|
  | `recipientUsername`| string | Recipient's username      |
  | `recipientType`   | string | Recipient's user type     |
  | `content`         | string | Notification content      |

#### Send Email Notification
- **Endpoint**: `POST /api/common/send-email`
- **Description**: Sends an email notification.
- **Controller**: `sendEmailNotif`
  - Sends email notifications using external email service.
- **Body Parameters**: 
  | Parameter    | Type   | Description               |
  |--------------|--------|---------------------------|
  | `email`      | string | Recipient email address   |
  | `subject`    | string | Email subject             |
  | `text`       | string | Email body text           |

#### Get Logged In User
- **Endpoint**: `GET /api/common/loggedIn`
- **Description**: Retrieves information of the logged-in user.
- **Controller**: `getLoggedIn`
  - Retrieves currently logged-in user's details.

#### Get Recipient
- **Endpoint**: `GET /api/common/recipient`
- **Description**: Retrieves recipient details.
- **Controller**: `getRecipient`
  - Fetches details of a specified recipient based on ID.
- **Query Parameters**: 
  | Parameter    | Type   | Description               |
  |--------------|--------|---------------------------|
  | `recipientId`| string | ID of the recipient       |

#### Get Contacted Users
- **Endpoint**: `GET /api/common/contacts`
- **Description**: Retrieves users that have been contacted.
- **Controller**: `getContactedUsers`
  - Retrieves users that have been in contact with the requester.


### Admin Routes

#### Get Packages
- **Endpoint**: `GET /api/admin/packages`
- **Description**: Fetches available health packages.
- **Controller**: `getPackages`
  - Retrieves all active health packages.
#### Update Package
- **Endpoint**: `PATCH /api/admin/packages/:id`
- **Description**: Modifies an existing package.
- **Controller**: `updatePackage`
  - Updates specific health package details.
- **Path Parameters (Params)**: 
  | Parameter | Type   | Description         |
  |-----------|--------|---------------------|
  | `id`      | string | Package identifier  |

#### Add Package
- **Endpoint**: `POST /api/admin/packages`
- **Description**: Creates a new package.
- **Controller**: `addPackage`
  - Adds a new health package.
#### Delete Package
- **Endpoint**: `DELETE /api/admin/packages/:id`
- **Description**: Deactivates a package.
- **Controller**: `deletePackage`
  - Soft deletes a health package.
- **Path Parameters (Params)**: 
  | Parameter | Type   | Description         |
  |-----------|--------|---------------------|
  | `id`      | string | Package identifier  |

#### Get Applications
- **Endpoint**: `GET /api/admin/applications`
- **Description**: Retrieves all pending doctor applications.
- **Controller**: `getApplications`
  - Fetches all pending doctor applications.

#### View Application Info
- **Endpoint**: `GET /api/admin/applications/:id`
- **Description**: Fetches details of a pending doctor application.
- **Controller**: `getApplicationInfo`
  - Views specific pending doctor application details.
- **Path Parameters (Params)**: 
  | Parameter | Type   | Description                  |
  |-----------|--------|------------------------------|
  | `id`      | string | Doctor identifier       |

#### Handle Application
- **Endpoint**: `PATCH /api/admin/applications/:id`
- **Description**: Manages a doctor application.
- **Controller**: `handleApplication`
  - Approves or rejects doctor applications.
- **Path Parameters (Params)**: 
  | Parameter | Type   | Description                  |
  |-----------|--------|------------------------------|
  | `id`      | string | Application identifier       |
- **Body Parameters**: 
  | Parameter | Type   | Description                  |
  |-----------|--------|------------------------------|
  | `registrationStatus` | string | status of doctor's application|


#### Add Admin
- **Endpoint**: `POST /api/admin/admins`
- **Description**: Creates an admin account.
- **Controller**: `addAdmin`
  - Registers a new admin user.
- **Body Parameters**: 
  | Parameter | Type   | Description                  |
  |-----------|--------|------------------------------|
  | `username`      | string | Username of added admin |
  | `password`      | string | Password of added admin|
  | `email`      | string | Email of added admin|


#### Delete Admin
- **Endpoint**: `DELETE /api/admin/admins`
- **Description**: Deletes an admin user.
- **Controller**: `deleteAdmin`
  - Removes an admin user.
- **Body Parameters**: 
  | Parameter | Type   | Description                  |
  |-----------|--------|------------------------------|
  | `username`  | string | Username of removed admin|

#### Delete Doctor
- **Endpoint**: `DELETE /api/admin/doctors`
- **Description**: Deletes an approved doctor user.
- **Controller**: `deleteDoctor`
  - Removes an approved doctor user.
- **Body Parameters**: 
  | Parameter | Type   | Description                  |
  |-----------|--------|------------------------------|
  | `username`  | string |Username of removed doctor|
  
#### Delete Patient
- **Endpoint**: `DELETE /api/admin/patients`
- **Description**: Deletes a patient user.
- **Controller**: `deletePatient`
  - Removes a patient user.
- **Body Parameters**: 
  | Parameter | Type   | Description                  |
  |-----------|--------|------------------------------|
  | `username`  | string |Username of removed patient|
  

#### Change Password
- **Endpoint**: `PATCH /api/admin/changePassword`
- **Description**: Updates logged in admin's password.
- **Controller**: `changePassword`
  - Changes admin user's password.
- **Body Parameters**: 
  | Parameter | Type   | Description                  |
  |-----------|--------|------------------------------|
  | `oldPassword`  | string | Old password of current admin|
  | `newPassword`  | string | New password of current admin|


## Credits

- [Mongoose docs](https://mongoosejs.com/docs/)
- [MongoDB docs](https://www.mongodb.com/)
- [Express docs](https://expressjs.com/en/4x/api.html)
- [ReactJs docs](https://reactjs.org/docs/getting-started.html)
- [Redux docs](https://redux.js.org/api/api-reference)
- [NodeJs docs](https://nodejs.org/en/docs/)
- [Ant Design website](https://ant.design/)
- [Material UI website](https://mui.com/)
- [Stripe docs](https://stripe.com/docs/)
- [MERN Youtube](https://www.youtube.com/channel/UC29ju8bIPH5as8OGnQzwJyA)
- [Stripe Youtube](https://youtu.be/1r-F3FIONl8)
- [JWT](https://www.youtube.com/watch?v=mbsmsi7l3r4)
- [Sockets.io docs](https://socket.io/)
- [Tailwind docs](https://tailwindcss.com/docs/)


## License

Portions of this software utilize Stripe, which is licensed under the Apache License 2.0. You can find the details of this license [here](https://www.apache.org/licenses/LICENSE-2.0).

The rest of the software is open source and licensed under the [GNU General Public License v3.0](https://choosealicense.com/licenses/gpl-3.0/).

