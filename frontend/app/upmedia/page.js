"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useAuthStore } from "@/lib/store";

const upmedia = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [formData, setFormData] = useState({
    title: "",
    release: "",
    rating: "",
    genre: "",
    summary: "",
    thumbnailUrl: "",
    videoUrl: "",
  });

  const { role } = useAuthStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newGenre = formData.genre.split(",");

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${apiUrl}/media`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: formData.title,
          release: formData.release,
          rating: formData.rating,
          genre: newGenre,
          summary: formData.summary,
          thumbnailUrl: formData.thumbnailUrl,
          videoUrl: formData.videoUrl,
        }),
      });
      const data = await response.json();

      if (response.ok || response.status === 201) {
        alert("OK");
      } else if (response.status === 403) {
        alert("error 400");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-93">
      {role !== "hunter" ? (
        <h2>UnAuthorized</h2>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="space-y-1">
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="release">Release</Label>
            <Input
              type="text"
              name="release"
              id="release"
              value={formData.release}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="rating">Rating</Label>
            <Input
              type="text"
              name="rating"
              id="rating"
              value={formData.rating}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="genre">Genre</Label>
            <Input
              type="text"
              name="genre"
              id="genre"
              value={formData.genre}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="summary">Summary</label>
            <Input
              type="text"
              name="summary"
              id="summary"
              value={formData.summary}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="thumbnailUrl">thumbnail Url</Label>
            <Input
              type="text"
              name="thumbnailUrl"
              id="thumbnailUrl"
              value={formData.thumbnailUrl}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-1 mb-4">
            <Label htmlFor="videoUrl">video Url</Label>
            <Input
              type="text"
              name="videoUrl"
              id="videoUrl"
              value={formData.videoUrl}
              onChange={handleChange}
            />
          </div>
          <Button type="submit" className="space-y-2">
            Submit
          </Button>
        </form>
      )}
    </div>
  );
};

export default upmedia;
