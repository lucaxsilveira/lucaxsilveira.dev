'use client';

import React from 'react';

const Contact: React.FC = () => {
  const sendEmail = async () => {
    console.log('sendEmail');

    const response = await fetch('/api/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'John Doe',
        email: 'lucaxsilveira@gmail.com',
        message: 'heajsfuah uihfauishfasuifh aiuhfaius',
      }),
    });

    const json = await response.json();
    console.log(json);
  };

  return (
    <div className="pt-20 text-white">
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro, laborum
        commodi libero eum, officiis eligendi assumenda, veritatis ad enim
        necessitatibus accusamus animi doloremque. Ut minus labore totam
        excepturi. Vitae, at.
      </p>
      <button onClick={sendEmail}>enviar email</button>
    </div>
  );
};

export default Contact;
