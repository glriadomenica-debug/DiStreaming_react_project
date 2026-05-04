import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { AiFillEdit } from "react-icons/ai";

interface Movie {
  id: number;
  title: string;
  description: string;
  rating: number;
  release_year: number;
  thumbnail: string;
  video_url: string;
  category_id: number;
}

export default function EditMovies() {
  const id = useParams().id;
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie>({
    id: 0,
    title: "",
    description: "",
    rating: 0,
    release_year: 0,
    thumbnail: "",
    video_url: "",
    category_id: 0,
  });

  const [formMovie, setFormMovie] = useState<any>({});

  const handleChange = (event: any) => {
    setFormMovie({
      ...formMovie,
      [event.target.name]: event.target.value,
    });
  };

  //untuk ambil semua data yang ada di DB Products
  const fetchMovie = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: "http://localhost:8000/api/movies/" + id,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response, "response");

      await setMovie(response.data.data);
      await setFormMovie(response.data.data);
    } catch (error) {
      console.log(error, "error");
    }
  };

  useEffect(() => {
    fetchMovie();
  }, [id]);

  const handleSubmitUpdate = async () => {
    try {
      const response = await axios({
        method: "PUT",
        url: "http://localhost:8000/api/movies/" + id,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: formMovie,
      });
      console.log(response, "response");
      navigate("/genre");
    } catch (error) {
      console.log(error, "error");
    }
  };

  return (
    <>
      <div className='bg-white rounded-xl px-4 py-4 opacity-80'>
        <div className='flex items-center text-xl '><AiFillEdit />
          Edit Movie</div>

        <div className="py-4 text-1xl">
          <label htmlFor="title">Title</label>
          <input type="text" name="title" className="w-full border border-gray-400 my-2 p-2 rounded"
            onChange={handleChange} defaultValue={formMovie.title} />
        </div>

        <div className="py-4 text-1xl">
          <label htmlFor="description">Description</label>
          <input type="text" name="description" className="w-full border border-gray-400 my-2 p-2 rounded"
            onChange={handleChange} defaultValue={formMovie.description} />
        </div>

        <div className="py-4">
          <label htmlFor="rating">Rating</label>
          <input type="number" name="rating" className="w-full border border-gray-400 my-2 p-2 rounded"
            onChange={handleChange} defaultValue={formMovie.rating} />
        </div>

        <div className="py-4">
          <label htmlFor="release_year">Release year</label>
          <input type="number" name="release_year" className="w-full border border-gray-400 my-2 p-2 rounded"
            onChange={handleChange} defaultValue={formMovie.release_year} />
        </div>

        <div className="py-4">
          <label htmlFor="thumbnail">Thumbnail</label>
          <input type="text" name="thumbnail" className="w-full border border-gray-400 my-2 p-2 rounded"
            onChange={handleChange} defaultValue={formMovie.thumbnail} />
        </div>


        <div className="py-4">
          <label htmlFor="video_url">Video URL</label>
          <input type="text" name="video_url" className="w-full border border-gray-400 my-2 p-2 rounded"
            onChange={handleChange} defaultValue={formMovie.video_url} />
        </div>

        <div className="py-4">
          <label htmlFor="category_id">Category ID</label>
          <input type="number" name="category_id" className="w-full border border-gray-400 my-2 p-2 rounded"
            onChange={handleChange} defaultValue={formMovie.category_id} />
        </div>

        <div className="my-4">
          <button className="bg-blue-900 opacity-80 hover:bg-blue-800 cursor-pointer text-white py-2 px-4 rounded" onClick={handleSubmitUpdate}>
            Update
          </button>
        </div>
      </div >
    </>
  )
}
