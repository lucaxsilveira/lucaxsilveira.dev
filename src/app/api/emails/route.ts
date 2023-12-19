import { EmailTemplate } from '@/components/EmailTemplate';
import resend from '@/services/resend';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const request = await req.json();
  const { name, message, email } = request;

  try {
    const data = await resend.emails.send({
      from: 'lucaxsilveira.dev <onboarding@resend.dev>',
      to: ['lucas.hoffmann.lh@gmail.com'],
      subject: 'Portfolio Contact',
      text: '-',
      react: EmailTemplate({
        name,
        email,
        message,
      }),
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
