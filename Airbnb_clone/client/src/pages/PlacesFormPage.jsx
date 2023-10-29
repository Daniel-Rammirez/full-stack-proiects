import { useEffect, useState } from "react";
import { PhotoUploader } from "../components/PhotoUploader";
import { Perks } from "../components/Perks";
import axios from "axios";
import { AccountNav } from "../components/AccountNav";
import { Navigate, useParams } from "react-router-dom";

export function PlacesFormPage() {
  const { id } = useParams();
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

  useEffect(() => {
    if (!id) return;
    axios.get(`/places/${id}`).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.addedPhotos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
    });
  }, [id]);

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
    if (id) {
      await axios.put(
        "/places",
        { id, ...placeData },
        {
          withCredentials: true,
          credentials: "include",
        }
      );
      setRedirect(true);
    } else {
      await axios.post("/places", placeData, {
        withCredentials: true,
        credentials: "include",
      });
      setRedirect(true);
    }
  };

  if (redirect) return <Navigate to={"/account/listings"} />;

  return (
    <div>
      <AccountNav />
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
        <PhotoUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
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
          <button
            type="submit"
            className="bg-airbnb w-full rounded-full text-white p-1 my-5 h-10"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
