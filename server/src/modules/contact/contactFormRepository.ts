import databaseClient from "../../../database/client";

import type { Result } from "../../../database/client";

type ContactForm = {
  id: number;
  lastname: string;
  firstname: string;
  email: string;
  subject: string;
  message: string;
};

class contactFormRepository {
  async create(contactForm: Omit<ContactForm, "id">) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO contact (lastname, firstname, email, subject, message) VALUE (?, ?, ?, ?, ?)",
      [
        contactForm.lastname,
        contactForm.firstname,
        contactForm.email,
        contactForm.subject,
        contactForm.message,
      ],
    );

    return result.insertId;
  }
}

export default new contactFormRepository();
