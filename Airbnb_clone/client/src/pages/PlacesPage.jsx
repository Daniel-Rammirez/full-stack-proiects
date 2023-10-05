import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Perks } from "../components/Perks";
import axios from "axios";

export function PlacesPage() {
  const { action } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);

  const addPhotoByLink = async (e) => {
    e.preventDefault();
    const { data: filename } = await axios.post("/upload-by-link", {
      link: photoLink,
    });
    setAddedPhotos((prev) => {
      return [...prev, filename];
    });
    setPhotoLink("");
  };

  const uploadPhoto = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    const { data: filenames } = await axios.post("/upload", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setAddedPhotos((prev) => {
      return [...prev, ...filenames];
    });
  };

  return (
    <div>
      {action !== "new" && (
        <div className="text-center">
          <Link
            className="inline-flex gap-1 bg-airbnb text-white py-2 px-6 rounded-full mt-10"
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
        </div>
      )}
      {action === "new" && (
        <div>
          <form className="flex flex-col gap-4">
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
            <label>Photos: </label>
            <div className="flex gap-4 items-center">
              <input
                value={photoLink}
                onChange={(e) => setPhotoLink(e.target.value)}
                type="text"
                placeholder="Add using a link ...jpg"
              />
              <button
                className="bg-airbnb text-white rounded-full w-40 h-11"
                onClick={addPhotoByLink}
              >
                Add photo
              </button>
            </div>
            <div className="mt-2 gap-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              <label className="border bg-transparent rounded-2xl p-8 text-2xl text-gray-500 inline-flex gap-2 mr-auto items-center cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  multiple
                  onChange={uploadPhoto}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m0-3l-3-3m0 0l-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75"
                  />
                </svg>
                Upload
              </label>
              {addedPhotos.length > 0 &&
                addedPhotos.map((link, indx) => (
                  <div className="flex" key={indx}>
                    <img
                      className="object-cover rounded-2xl h-32 w-full"
                      src={"http://localhost:4000/uploads/" + link}
                      alt={"Image uploaded by user" + link}
                    />
                  </div>
                ))}
            </div>
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
