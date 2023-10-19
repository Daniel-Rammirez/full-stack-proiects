import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Perks } from "../components/Perks";
import { PhotoUploader } from "../components/PhotoUploader";
import axios from "axios";

export function PlacesPage() {
  const { action } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [redirect, setRedirect] = useState(false);

  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios
      .get("/places", {
        withCredentials: true,
        credentials: "include",
      })
      .then(({ data }) => setPlaces(data));
  }, []);

  // if we have redirect and in /listings/new (new is the action) navigate to
  if (redirect && action) return <Navigate to={"/account/listings"} />;

  const addNewPlace = async (e) => {
    e.preventDefault();
    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    };
    await axios.post("/places", placeData, {
      withCredentials: true,
      credentials: "include",
    });
    setRedirect(true);
  };

  return (
    <div>
      {action !== "new" && (
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
                    to={"/account/listings/" + place._id}
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
      )}
      {action === "new" && (
        <div>
          <form onSubmit={addNewPlace} className="flex flex-col gap-4">
            <label>Title: </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="My lovely place"
            />
            <label>Address: </label>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              placeholder="address"
            />
            <PhotoUploader
              addedPhotos={addedPhotos}
              onChange={setAddedPhotos}
            />
            <label>Description: </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded-lg p-2 h-24"
              placeholder="My cossy place"
            />
            <label>Perks: </label>
            <Perks selected={perks} onChange={setPerks} />
            <label>Extra info: </label>
            <p className="text-gray-500">House rules</p>
            <textarea
              value={extraInfo}
              onChange={(e) => setExtraInfo(e.target.value)}
              className="border rounded-lg p-2 w-full h-24"
              placeholder="My lovely place"
            />
            <label>Check in and check out times:</label>
            <div className="grid grid-cols-3 text-center gap-2">
              <div>
                <label>Check In</label>
                <input
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  type="text"
                  className=""
                  placeholder="15:00"
                />
              </div>
              <div>
                <label>Check Out</label>
                <input
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  type="text"
                  className=""
                  placeholder="11:00"
                />
              </div>
              <div>
                <label>Max guests</label>
                <input
                  value={maxGuests}
                  onChange={(e) => setMaxGuests(e.target.value)}
                  type="text"
                  className=""
                  placeholder="2"
                />
              </div>
            </div>
            <div>
              <button className="bg-airbnb w-full rounded-full text-white p-1 my-5 h-10">
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
