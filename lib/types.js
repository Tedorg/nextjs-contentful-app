import { z } from "zod";

export const signUpSchema = z.object({
  firstName: z.string().min(1, "Bitte Vornamen angeben."),
  familyName: z.string().min(1, "Bitte Nachnamen angeben."),
  email: z.string().email("Bitte gültige Email-Adresse eingeben."),
  desiredDate: z.string().optional(),
  message: z.string().optional(),
});

export async function POST(req) {
  try {
    const data = await req.json();

    

    // Here you could process the data, e.g., send an email or store in DB
    return Response.json({
      success: true,
      message: "Vielen Dank für Ihre Anfrage. Wir melden uns in Kürze.",
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