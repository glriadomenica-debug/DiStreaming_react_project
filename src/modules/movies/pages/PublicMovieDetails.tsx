import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";

interface Category {
  id: number;
  name: string;
}
interface Movie {
  id: number;
  title: string;
  description: string;
  rating: number;
  release_year: number;
  thumbnail: string;
  category_id: number;
  category?: Category;
  video_url?: string;
}

export default function PublicMovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const fetchMovie = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: `http://localhost:8000/api/movies/${id}`,
      });
      setMovie(response.data.data);
    } catch (error) {
      console.log(error, "error");
    }
  };

  useEffect(() => {
    fetchMovie();
  }, [id]);

  if (!movie) {
    return <div className='text-white'> Loading...</div>;
  }
  return (
    <div className='bg-white p-6 rounded-lg shadow max-w-4xl mx-auto'>
      <div className="relative">
        <img
          src={movie.thumbnail}
          alt={movie.title}
          className="w-full h-80 object-cover rounded"
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded'></div>
        {movie.video_url && (
          <button className='absolute bottom-4 left-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow-lg cursor-pointer' onClick={() => {
            document.getElementById("trailer")?.scrollIntoView({ behavior: "smooth" })
          }}> ▶ Watch
          </button>
        )}

      </div>
      <div className='bg-white p-6 rounded-lg shadow mt-4'>
        <h1 className="text-3xl font-bold text-yellow-900">{movie.title}</h1>
        <p className='text-black mt-2'>{movie.category?.name || "No Category"}</p>

        <p className='text-black mt-2'>{movie.release_year} • ⭐ {movie.rating}</p>
        <h4 className='text-gray-500 mt-4'>{movie.description}</h4>
      </div>

      {/* TRAILER */}
      {movie.video_url && (
        <div id="trailer" className='mt-6 bg-white p-4 rounded shadow'>
          <h2 className="text-xl font-semibold mb-2 text-red-700">Trailer</h2>

          <iframe
            width="100%"
            height="400"
            src={movie.video_url}
            title="Movie Trailer"
            allowFullScreen
            className='rounded'
          ></iframe>
        </div>
      )}

    </div>
  );
}
