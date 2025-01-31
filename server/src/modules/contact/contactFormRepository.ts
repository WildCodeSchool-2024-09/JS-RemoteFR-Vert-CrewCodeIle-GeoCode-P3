import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type ContactForm = {
  id: number;
  lastname: string;
  firstname: string;
  email: string;
  subject: string;
  message: string;
};

type IsTreatedMessage = {
  id: number;
  is_treated: number;
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

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("SELECT * FROM contact");
    return rows;
  }

  async updateIsTreated(message: IsTreatedMessage) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE contact SET is_treated = ? WHERE id = ?",
      [message.is_treated, message.id],
    );
    return result.affectedRows;
  }

  async deleteMessage(id: number) {
    const [result] = await databaseClient.query<Result>(
      "DELETE from contact WHERE id = ?",
      [id],
    );
    return result.affectedRows;
  }
}

export default new contactFormRepository();
