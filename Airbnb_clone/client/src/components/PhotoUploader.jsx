/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";

export function PhotoUploader({ addedPhotos, onChange }) {
  const [photoLink, setPhotoLink] = useState("");

  const addPhotoByLink = async (e) => {
    e.preventDefault();
    const { data: filename } = await axios.post("/upload-by-link", {
      link: photoLink,
    });
    onChange((prev) => {
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
    onChange((prev) => {
      return [...prev, ...filenames];
    });
  };

  return (
    <>
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
    </>
  );
}
