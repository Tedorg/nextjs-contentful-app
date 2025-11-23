// app/api/book/route.js
import { render } from "@react-email/render";
import EmailTemplate from "@/components/email-template";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {

   if (!process.env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY not set");
    }

    const formdata = await req.json();

    console.log("Received form data:", formdata);





    const emailProps = {
      from: 'Acme <onboarding@resend.dev>',
      to: [formdata.email],
      subject: 'Hello world',
      react: EmailTemplate({ firstName: formdata.firstName }),
    };

    const { data, error } = await resend.emails.send(emailProps);

    await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: [formdata.email],
      subject: "Wir haben Ihre Anfrage erhalten",
      html: `<p>Vielen Dank für Ihre Anfrage, ${formdata.firstName}.</p>
             <p>Wir haben Ihre Nachricht erhalten und melden uns in Kürze bei Ihnen.</p>`
    });

  return Response.json({
      success: true,
      message: "Vielen Dank für Ihre Anfrage. Wir melden uns in Kürze .",
    });
  } catch (error) {
    console.error("Error handling form submission:", error);
    return Response.json(
      {
        success: false,
        message: "Ein Fehler ist aufgetreten beim Verarbeiten der Anfrage.",
      },
      { status: 500 }
    );
  }
}







// // app/api/book/route.js
// import { render } from "@react-email/render";

// import { Resend } from 'resend';

// const resend = new Resend(process.env.RESEND_API_KEY);

// export async function POST(req) {
//   try {
//     if (!process.env.RESEND_API_KEY) {
//       throw new Error("RESEND_API_KEY not set");
//     }

//     const data = await req.json();

//     console.log("Received form data:", data);

//     await resend.emails.send({
//       from: 'kontakt@rahelschmid.ch', // adjust domain as needed
//       to: 'rs.runny974@slmail.me', // replace with actual recipient email
//       subject: 'Neue Buchungsanfrage',
//       html: `
//         <p><strong>Vorname:</strong> ${data.firstName}</p>
//         <p><strong>Nachname:</strong> ${data.familyName}</p>
//         <p><strong>Email:</strong> ${data.email}</p>
//         <p><strong>Wunschtermin:</strong> ${data.desiredDate}</p>
//         <p><strong>Nachricht:</strong><br>${data.message.replace(/\n/g, '<br>')}</p>
//       `
//     });

//     // TODO: Here you could send email or save to DB
//     return Response.json({
//       success: true,
//       message: "Vielen Dank für Ihre Anfrage. Wir melden uns in Kürze .",
//     });
//   } catch (error) {
//     console.error("Error handling form submission:", error);
//     return Response.json(
//       {
//         success: false,
//         message: "Ein Fehler ist aufgetreten beim Verarbeiten der Anfrage.",
//       },
//       { status: 500 }
//     );
//   }
// }