import React from 'react';

interface EmailTemplateProps {
  name: string;
  email: string;
  message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  email,
  message,
}) => (
  <div>
    <h2>{name}</h2>
    <p>Email: {email}</p>
    <p>{message}</p>
  </div>
);
