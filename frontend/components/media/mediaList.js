"use client";
import { useEffect, useState } from "react";
import MediaCard from "./mediaCard";

const MediaList = () => {
  const [mediaData, setMediaData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/api/media", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        setMediaData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 p-4 mt-[5vh]">
      {mediaData.map((media) => (
        <MediaCard key={media._id} media={media} />
      ))}
    </div>
  );
};

export default MediaList;
