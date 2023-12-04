# Virtual Clinic - A Comprehensive Healthcare Management System

## Motivation

In the pursuit of making healthcare more accessible and management more seamless, this project was born out of the need to bridge the gap between patients and healthcare providers. The Virtual Clinic platform is designed to offer an integrated environment for patients, doctors, and administrators to interact, manage medical records, and facilitate healthcare services efficiently.

## Build Status

The current build is in the alpha stage with core functionalities implemented. Continuous integration is in place, ensuring build stability. Known issues are documented and tracked for resolution.

## Code Style

The project adheres to the "standard" coding conventions for clarity and maintainability. This ensures that contributions and reviews can be conducted with ease, maintaining a consistent codebase.

## Screenshots

*Visual representations of the platform will be here.*

## Tech/Framework Used

- **Backend**: Node.js, Express
- **Frontend**: React.js, Redux for state management
- **Database**: MongoDB
- **Authentication**: JWT for secure login sessions

## Features

## Features

- A Guest can register as a patient using username, name, email, password, date of birth, gender, mobile number, emergency contact ( full name , mobile number)
- A Patient can upload/remove documents (pdf,jpeg,jpg,png) for his medical history
- A Guest can submit a request to register as doctor using username, name, email, password, date of birth, hourly rate, affiliation (hospital), educational background
- A Guest can upload and submit required documents upon registration as a doctor such as id, medical licenses and medical degree 
- A Doctor/Patient/Administrator can login with username and password
- A Doctor/Patient/Administrator can logout
- A Adminstrator can add another adminstrator with a set username and password
- A Adminstrator can remove a doctor/patient / admin from the system
- A Adminstrator can view all of the information uploaded by a doctor to apply to join the platform
- A Adminstrator can accept or reject the request of a doctor to join the platform
- A Adminstrator can add/update/delete health packages with different price ranges depending on the services included in each package ( silver, gold, platinum).
- A Doctor/Patient/Administrator can change my password
- A Doctor/Patient/Administrator can  reset a forgotten password through otp sent to email
- A Doctor can edit/ update my email, hourly rate or affiliation (hospital)
- A Adminstrator can accept a request for the registration of a doctor
- A Doctor can view and accept the employment contract
- A Doctor can add his available time slots for appointments
- A Patient can add family members using name, national id, age, gender and relation to the patient 
- A Patient can link another patient's account as a family member using email or phone number stating relation to the patient
- A Patient can choose to pay for his appointment using his wallet or credit card
- A Patient can enter credit card details and pay for an appointment using stripe
- A Patient can view registered family members
- A Patient/doctor can filter appointments by date/status
- A Patient/ Doctor can view uploaded health records 
- A Doctor can view information and health records of patient registered with him
- A Patient/Doctor can view all new and old prescriptions and their statuses (filled/ not filled)
- A Patient can view health package options and details
- A Patient can subscribe to a health package for himself and his family members (if any)
- A Patient can choose to pay for the chosen health package using wallet or credit card 
- A Patient can view subscribed health package  for himself and his family members (if any)
- A Patient can view the status of my health care package subscription (subscribed with renewal date/ unsubscribed/ cancelled with end date)  for himself and his family members (if any)
- A Patient can cancel a subscription of a health package  for himself and his family members (if any)
- A Doctor can view a list of all his patients
- A Doctor can search for a patient by name
- A Doctor can filter patients based on upcoming appointments
- A Doctor can select a patient from the list of patients
- A Patient can view a list of all doctors along with their speciality, session price (based on subscribed health package if any)
- A Patient can search for a doctor by name and/or speciality 
- A Patient can filter  a doctor by speciality and/or availability on a certain date and at a specific time
- A Patient can select a doctor from the search/filter results 
- A Patient can view all details of selected doctor including specilaty, affiliation (hospital), educational background 
- A Patient can view all available appointments of a selected doctor
- A Patient can select an appointment date and time for himself or for a family member
- A Patient/Doctor can receive a notification of his appointment on the system and by mail 
- A Patient/doctor can view a list of all his upcoming / past appointments
- A Patient/Doctor can filter appointments by date or status (upcoming, completed, cancelled, rescheduled)
- A Patient can reschedule an appointment for himself or for a family member
- A Doctor can reschedule an appointment for a patient
- A Patient/Doctor can cancel an appointment for himself or for a family member
- A Patient/Doctor can receive a notification that his appointment is cancelled or rescheduled on the system and by mail 
- A Doctor can schedule a follow-up for a patient
- A Doctor can add/delete medicine to/from the prescription from the pharmacy platform
- A Doctor can add/update dosage for each medicine added to the prescription
- A Patient can view a list of all his perscriptions
- A Patient can filter prescriptions based on date or doctor or filled or unfilled
- A Patient can select a prescription from his list of perscriptions
- A Patient can view the details of his selected prescription
- A Patient can choose to pay directly pay for the prescription items wallet or credit card
- A Patient/Doctor can download selected prescription (pdf) 
- A Doctor can add new health records for a patient
- A Patient/Doctor can start/end a video call with the doctor/ patient
- A Doctor can add a patient's prescription
- A Doctor can update a patient's prescription before it is submitted to the pharmacy
- A Patient can request a follow-up to a previous appointment for myself or a family member
- A Doctor can accept or revoke a follow-up session request from a patient
- A Patient can receive a refund in his wallet when a doctor cancels an appointment
- A Patient/Doctor can view the amount in their wallet
- A Patient/Doctor can chat with a doctor/patient


## Code Examples

*Code snippets will be  here.*

## Installation



## API Reference



## Tests



## How to Use?



## Contribute



## Credits



## License


