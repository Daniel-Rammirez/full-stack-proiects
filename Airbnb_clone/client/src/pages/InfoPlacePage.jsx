import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function InfoPlacePage() {
  const { id } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  useEffect(() => {
    axios.get(`/places/${id}`).then((response) => {
      setData(response.data);
      setLoading(false);
    });
  }, []);

  const roundedCorners = (indx) => {
    const byDefault = "object-cover h-48";
    if (indx === 1) {
      return byDefault + " rounded-tr-2xl";
    } else if (indx === 3) {
      return byDefault + " rounded-br-2xl";
    }
    return byDefault;
  };

  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (showAllPhotos) {
    backToTop();
    return (
      <div className="absolute bg-white min-h-screen w-[1400px] align-middle">
        <div className="fixed w-full bg-white h-16 top-0">
          <button
            className="rounded-full hover:bg-slate-50 p-2 text-center mt-4"
            onClick={() => setShowAllPhotos(false)}
          >
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
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
        </div>
        <div className="my-16 flex flex-col gap-2 justify-center items-center">
          {data.addedPhotos?.length > 0 &&
            data.addedPhotos.map((photo) => (
              <img
                className="w-2/4"
                key={photo}
                src={"http://localhost:4000/uploads/" + photo}
              />
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-28">
      {!loading && (
        <div>
          <h1 className="text-3xl font-normal mb-2">{data.title}</h1>
          <h2 className="mb-2">{data.address}</h2>
          <div className="flex gap-2 rounded-2xl">
            <img
              className="w-1/2 rounded-l-2xl"
              src={"http://localhost:4000/uploads/" + data.addedPhotos[0]}
            />
            <div className="grid grid-cols-2 gap-2">
              {data.addedPhotos
                .filter((photo, indx) => indx > 0 && indx < 5)
                .map((photo, indx) => (
                  <img
                    key={photo}
                    src={"http://localhost:4000/uploads/" + photo}
                    className={roundedCorners(indx)}
                  />
                ))}
            </div>
            <div className="relative">
              <button
                onClick={() => setShowAllPhotos(true)}
                className="flex gap-1 px-2 py-1 border border-black absolute bottom-5 right-6 w-44  bg-white rounded-lg justify-center"
              >
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
                    d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z"
                  />
                </svg>
                Show all photos
              </button>
            </div>
          </div>
          <div className="text-lg font-medium my-4">Description</div>
          <div className="text-justify p-2">{data.description}</div>
          <div className="text-justify p-2">{data.description}</div>
          <div className="text-justify p-2">{data.description}</div>
          <div className="text-justify p-2">{data.description}</div>
          <div className="text-justify p-2">{data.description}</div>
          <div className="text-justify p-2">{data.description}</div>
          <div className="text-justify p-2">{data.description}</div>
        </div>
      )}
    </div>
  );
}
