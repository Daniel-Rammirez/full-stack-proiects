import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function InfoPlacePage() {
  const { id } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

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
          </div>
        </div>
      )}
    </div>
  );
}
