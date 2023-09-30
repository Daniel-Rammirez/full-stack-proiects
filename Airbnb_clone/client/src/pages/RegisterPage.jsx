import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/register", {
        name,
        email,
        password,
      });
      alert("Registration successful. You can log in.");
    } catch (e) {
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col grow justify-around">
      <div className="mb-64">
        <h2 className="text-2xl text-center mb-2">Register</h2>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          <input
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="primary bg-airbnb mt-2">Register</button>
          <div className="text-center text-gray-400 py-1">
            {"Already a member? "}
            <Link to={"/login"} className="text-black underline">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
