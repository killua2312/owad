"use client";
import { BsPlayCircleFill } from "react-icons/bs";
import { MdPlayDisabled } from "react-icons/md";
import Link from "next/link";

const MediaCard = ({ media }) => {
  return (
    <div
      key={media._id}
      className="justify-self-center rounded-2xl shadow-3d pb-5 pl-5"
    >
      <div className="transform hover:scale-110 transition duration-300">
        <img
          src={media.thumbnailUrl}
          alt={media.title}
          className="object-cover rounded-t-2xl"
        />
        <div className="mt-10 flex flex-row items-center gap-5">
          {media.videoUrl === "Coming Soon" ? (
            <MdPlayDisabled className="text-6xl" />
          ) : (
            <Link href={`/player?url=${encodeURIComponent(media.videoUrl)}`}>
              <BsPlayCircleFill className="text-6xl" />
            </Link>
          )}

          <div className="flex flex-col gap-2">
            <h2>{media.title}</h2>
            <div className="flex flex-row gap-3">
              {media.genre.map((gen) => (
                <h3>{gen}</h3>
              ))}
            </div>
            {media.videoUrl === "Coming Soon" && <h3>Coming Soon</h3>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaCard;
