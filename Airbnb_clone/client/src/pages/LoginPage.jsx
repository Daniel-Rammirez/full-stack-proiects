import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../context/user";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const { setUser } = useContext(UserContext);

  async function handleLoginSubmit(event) {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        "/login",
        { email, password },
        { withCredentials: true }
      );
      setUser(data);
      alert("Login success");

      setRedirect(true);
    } catch (e) {
      alert("Login failed");
    }
  }

  if (redirect) return <Navigate to={"/"} />;

  return (
    <div className="flex flex-col grow justify-around">
      <div className="mb-64">
        <h2 className="text-2xl text-center mb-2">Login</h2>
        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button className="primary bg-airbnb mt-2">Login</button>
          <div className="text-center text-gray-400 py-1">
            {"Don't have an account yet? "}
            <Link to={"/register"} className="text-black underline">
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
