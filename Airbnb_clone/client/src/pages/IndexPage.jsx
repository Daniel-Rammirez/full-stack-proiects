import axios from "axios";
import { useEffect, useState } from "react";

export function IndexPage() {
  const [places, setPlaces] = useState([]);

  const formatNumber = (number) => {
    const exp = /(\d)(?=(\d{3})+(?!\d))/g;
    const rep = "$1,";
    let arr = number.toString().split(".");
    arr[0] = arr[0].replace(exp, rep);
    return arr[1] ? arr.join(".") : arr[0];
  };

  useEffect(() => {
    axios
      .get("/places")
      .then((res) =>
        setPlaces([
          ...res.data,
          ...res.data,
          ...res.data,
          ...res.data,
          ...res.data,
        ])
      );
  }, []);
  console.log(places);
  return (
    <div className="flex gap-8 flex-wrap items-center justify-center">
      {places.length > 0 &&
        places.map((place) => (
          <div key={place._id}>
            <div className="bg-gray-300 rounded-2xl w-72 h-72 relative">
              <img
                className="rounded-2xl h-72 w-auto grow object-cover"
                src={"http://localhost:4000/uploads/" + place.addedPhotos[0]}
                alt={`Photo from the place ${place.title}`}
              />
              <button className="absolute top-1 right-1 text-white ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
              </button>
            </div>
            <div className="mt-3">{place.title}</div>
            <div className="font-thin">{place.address}</div>
            <div className="font-thin">6 - 10 Nov</div>
            <div className=" underline underline-offset-1">
              <span>${formatNumber(place.price)} AUD</span>
              <span className="font-light"> total</span>
            </div>
          </div>
        ))}
    </div>
  );
}
