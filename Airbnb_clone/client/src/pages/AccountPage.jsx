import { useContext, useState } from "react";
import { UserContext } from "../context/user";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";

export function AccountPage() {
  const [redirect, setRedirect] = useState(false);
  const { user, ready, setUser } = useContext(UserContext);
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }
  if (!ready) {
    return <h2>Loading...</h2>;
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  const linkClasses = (page) => {
    let classes = "px-4 py-2";
    if (page === subpage) {
      classes += " bg-airbnb rounded-full text-white";
    }
    return classes;
  };

  // this works if you pass in the third argument the credentials
  const logout = async () => {
    await axios.post(
      "/logout",
      {},
      {
        withCredentials: true,
        credentials: "include",
      }
    );
    setRedirect("/");
    setUser(null);
  };

  if (redirect) return <Navigate to={redirect} />;

  return (
    <>
      <nav className="py-2 flex gap-8 justify-center">
        <Link className={linkClasses("profile")} to={"/account"}>
          My Profile
        </Link>
        <Link className={linkClasses("bookings")} to={"/account/bookings"}>
          My Bookings
        </Link>
        <Link className={linkClasses("listings")} to={"/account/listings"}>
          My Listings
        </Link>
      </nav>

      {subpage === "profile" && (
        <div className="text-center flex flex-col gap-2 mt-3 mx-auto">
          Logged in as {user.name} ({user.email})
          <button
            onClick={logout}
            className="bg-airbnb text-white max-w-sm rounded-full py-1 "
          >
            Logout
          </button>
        </div>
      )}
    </>
  );
}
