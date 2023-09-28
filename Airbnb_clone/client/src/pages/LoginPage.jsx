import { Link } from "react-router-dom";

export function LoginPage() {
  return (
    <div className="flex flex-col grow justify-around">
      <div className="mb-64">
        <h2 className="text-2xl text-center mb-2">Login</h2>
        <form className="max-w-md mx-auto">
          <input type="email" placeholder="your@email.com" />
          <input type="password" placeholder="password" />
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
