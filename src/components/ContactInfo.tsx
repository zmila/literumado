// ContactInfo component to display contact information: first, last name, phone number, email, and address

import React from 'react';

interface ContactInfoProps {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  address: string;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ firstName, lastName, phoneNumber, email, address }) => {
  return (
    <div>
      <h2>Contact Information</h2>
      <p><strong>Name:</strong> {firstName} {lastName}</p>
      <p><strong>Phone Number:</strong> {phoneNumber}</p>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Address:</strong> {address}</p>
    </div>
  );
};

export default ContactInfo;
