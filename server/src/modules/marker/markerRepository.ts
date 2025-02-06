import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";
import convertSlotToHoursMinutes from "../../helpers/convertSlotToHoursMinutes";
import type { Marker } from "../../lib/definitions";
import type { Book } from "../../lib/definitions";

class MarkerRepository {
  async read(id: string) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT s.id_station, s.name, s.address, t.power, COUNT(t.power) as nb_power FROM station AS s JOIN terminal AS t ON t.station_id = s.id_station AND s.id_station = ? GROUP BY t.power",
      [id],
    );

    return rows as unknown as Marker;
  }

  async readBook(id: string) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT user_id, station_id, slot, start_book, price FROM book, book_cost WHERE station_id = ? AND start_book > NOW()",
      [id],
    );

    return rows as unknown as Book;
  }

  async create(book: Omit<Book, "id">) {
    const [startSlot, endSlot] = convertSlotToHoursMinutes(book.slot);

    if (book !== null) {
      const [result] = await databaseClient.query<Result>(
        "INSERT INTO book (user_id, station_id, slot, start_book, end_book) VALUES (?,?,?,?,?)",
        [book.user_id, book.station_id, book.slot, startSlot, endSlot],
      );
      return result.insertId;
    }
  }
} // end
export default new MarkerRepository();
