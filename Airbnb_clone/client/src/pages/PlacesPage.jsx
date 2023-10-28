import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import { AccountNav } from "../components/AccountNav";

export function PlacesPage() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios
      .get("/places", {
        withCredentials: true,
        credentials: "include",
      })
      .then(({ data }) => setPlaces(data));
  }, []);

  return (
    <div>
      <AccountNav />
      <div className="text-center">
        <Link
          className="inline-flex gap-1 bg-airbnb text-white py-2 px-6 rounded-full mt-6"
          to={"/account/listings/new"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
              clipRule="evenodd"
            />
          </svg>
          Add new place
        </Link>
        <div className="flex flex-col gap-4 mt-6">
          {places.length > 0 &&
            places.map((place, indx) => {
              return (
                <Link
                  to={"/account/listings/id/" + place._id}
                  className="flex gap-4 bg-gray-100 rounded-2xl cursor-pointer"
                  key={indx}
                >
                  <div className="flex bg-gray-300 w-36 h-36 shrink-0 rounded-2xl">
                    {place.addedPhotos.length > 0 && (
                      <img
                        className="object-cover rounded-2xl"
                        src={
                          "http://localhost:4000/uploads/" +
                          place.addedPhotos[0]
                        }
                        alt=""
                      />
                    )}
                  </div>

                  <div>
                    <h2 className="text-xl text-left">{place.title}</h2>
                    <p className="text-sm mt-2 text-justify pr-4">
                      {place.description}
                    </p>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
}
