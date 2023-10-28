import { useContext, useState } from "react";
import { UserContext } from "../context/user";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { PlacesPage } from "./PlacesPage";
import { AccountNav } from "../components/AccountNav";

export function ProfilePage() {
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

  // this works if you pass in the third argument the credentials
  // second pargument empty object
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
      <AccountNav />
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
      {subpage === "listings" && <PlacesPage />}
    </>
  );
}
