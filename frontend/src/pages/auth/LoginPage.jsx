import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { authApi } from "../../api/auth.api";
import { useAuthStore } from "../../store/authStore";

export default function LoginPage() {
  const navigate = useNavigate();

  const setAuth = useAuthStore(
    (state) => state.setAuth
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    console.log("CLICOU EM ENTRAR");

    try {
      setLoading(true);

      const response =
        await authApi.login({
          email,
          password,
        });

      const {
        user,
        token,
      } = response.data;

      setAuth({
        user,
        token,
      });

      navigate("/");
  //   } catch (error) {
  // console.log("ERRO COMPLETO:");
  // console.log(error);

  // console.log("MESSAGE:");
  // console.log(error.message);

  // console.log("RESPONSE:");
  // console.log(error.response);

  // console.log("REQUEST:");
  // console.log(error.request);

      
      
  //   } 

  } catch (error) {
  console.log(error.response?.data);

  alert(
    error.response?.data?.message
  );
}
   finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "320px",
          gap: "10px",
        }}
      >
        <h1>ERP Control</h1>

        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Entrando..."
            : "Entrar"}
        </button>
      </form>
    </div>
  );
}