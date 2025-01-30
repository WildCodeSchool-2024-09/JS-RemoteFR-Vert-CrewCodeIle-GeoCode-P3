import { useAuth } from "../context/userContext";

export default function Logbutton() {
  const { login, logout, token } = useAuth();

  return (
    <>
      <section className="mt-40">
        <button onClick={() => login(token)} type="button">
          se connecter
        </button>
        <button onClick={() => logout()} type="button">
          se deconnecter
        </button>
      </section>
    </>
  );
}
