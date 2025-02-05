import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import type { BookingProps } from "../assets/definition/lib";
import { useAuth } from "../context/userContext";

export default function ModalBooking({
  closeModal,
}: { closeModal: () => void }) {
  const { userInfo } = useAuth();
  const id = userInfo?.email;

  const [booking, setBooking] = useState<BookingProps[]>();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/profile/book/${id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })

      .then((res) => res.json())
      .then((data) => setBooking(data));
  }, [id]);

  const deleteBooking = async (bookId: number) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/profile/book/${bookId}`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      },
    );
    const data = await response.json();
    if (response.status === 201) {
      toast.success(data.message);
    }
  };

  console.info(booking);
  return (
    <>
      <table className="z-[1000] border-2   border-interestColor rounded-lg h-60 flex-col justify-center items-center text-center font-paragraph bg-lightColor w-5/6 mx-auto my-12 fixed top-32 left-8   -translate-x1/2  vsm:top-10 vsm:pb-8 vmd:top-16 sm:w-4/6 md:left-32 lg:left-8 lg:w-[80vw] lg:translate-x-[8vw] lg:h-[40vh] lg:top-[20vh] xl:translate-x-[35vw] xl:top-[20vh] 2xl:w-1/4">
        <thead>
          <tr className="h-16 lg:text-2xl">
            <th className="border-2 w-1/4  border-interestColor  ">Nom</th>
            <th className="border-2 w-1/4  border-interestColor ">Adresse</th>
            <th className="border-2 w-1/4  border-interestColor ">Début</th>
            <th className="border-2 w-1/4  border-interestColor ">Fin</th>
            <th className="border-2 w-1/4  border-interestColor ">Annuler</th>
          </tr>
          {booking &&
            (booking.length > 0 ? (
              booking.map((m) => (
                <tr className="border-2 border-interestColor " key={m.id}>
                  <td className="border-2 border-interestColor ">{m.name}</td>,
                  <td>{m.adress}</td>,
                  <td className="border-2 border-interestColor ">
                    {m.start_book.toString()}
                  </td>
                  ,<td>{m.end_book.toString()}</td>
                  <td>
                    <button
                      type="button"
                      key={m.id}
                      onClick={() => deleteBooking(m.id)}
                      className="border border-red-800 bg-red-800 text-white py-1 px-1"
                    >
                      X
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <>
                <tr>
                  <td colSpan={5} className="lg:text-4xl">
                    Aucune réservation
                  </td>
                </tr>
                <tr>
                  <td className="relative bottom-12 left-24">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="fixed  border border-interestColor w-fit mx-auto h-fit  rounded-3xl bg-interestColor text-white py-1 px-2 md:translate-x-[9vw] lg:translate-x-[16vw] lg:text-4xl xl:translate-x-[3vw]"
                    >
                      Ok
                    </button>
                  </td>
                </tr>
              </>
            ))}
        </thead>
      </table>
    </>
  );
}
