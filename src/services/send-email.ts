export interface ISendEmail {
  name: string;
  email: string;
  message: string;
}

export const sendEmail = ({
  email,
  name,
  message,
}: ISendEmail): Promise<Response> => {
  return fetch('/api/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
      message,
    }),
  });
};
